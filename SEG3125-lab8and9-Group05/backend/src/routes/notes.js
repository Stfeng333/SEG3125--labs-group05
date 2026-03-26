const express = require('express')
const { pool } = require('../db/pool')
const { config } = require('../config')
const { ensureTags, resolveUserId } = require('../db/helpers')

const notesRouter = express.Router()

const NOTE_SELECT = `
  SELECT
    n.note_id AS id,
    n.title,
    LEFT(n.body, 160) AS preview,
    n.body AS content,
    n.class_id AS "classId",
    n.course_id AS "courseId",
    n.created_at AS "createdAt",
    n.updated_at AS "updatedAt",
    json_build_object(
      'id', u.user_id,
      'displayName', u.display_name
    ) AS author,
    COALESCE((SELECT AVG(r.rating)::numeric(3,2) FROM note_ratings r WHERE r.note_id = n.note_id), 0) AS rating,
    COALESCE((SELECT COUNT(*) FROM note_comments c WHERE c.note_id = n.note_id), 0) AS "commentsCount",
    COALESCE(
      (
        SELECT array_agg(t.tag_name ORDER BY t.tag_name)
        FROM note_tags nt
        JOIN tags t ON t.tag_id = nt.tag_id
        WHERE nt.note_id = n.note_id
      ),
      '{}'::text[]
    ) AS tags
  FROM notes n
  JOIN users u ON u.user_id = n.author_id
`

notesRouter.get('/notes', async (req, res, next) => {
  try {
    const where = []
    const params = []

    if (req.query.classId) {
      params.push(req.query.classId)
      where.push(`n.class_id = $${params.length}`)
    }

    if (req.query.courseId) {
      params.push(req.query.courseId)
      where.push(`n.course_id = $${params.length}`)
    }

    if (req.query.q) {
      params.push(`%${String(req.query.q).trim()}%`)
      where.push(`(n.title ILIKE $${params.length} OR n.body ILIKE $${params.length})`)
    }

    const whereClause = where.length > 0 ? ` WHERE ${where.join(' AND ')}` : ''
    const { rows } = await pool.query(`${NOTE_SELECT}${whereClause} ORDER BY n.created_at DESC`, params)
    res.json(rows)
  } catch (error) {
    next(error)
  }
})

notesRouter.get('/notes/:noteId', async (req, res, next) => {
  try {
    const { rows } = await pool.query(`${NOTE_SELECT} WHERE n.note_id = $1`, [req.params.noteId])
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Note not found' })
    }

    res.json(rows[0])
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/notes', async (req, res, next) => {
  const client = await pool.connect()

  try {
    const { title, content, tags = [], classId = null, courseId = null, authorId = null } = req.body || {}

    if (!title || !content) {
      return res.status(400).json({ message: 'title and content are required' })
    }

    await client.query('BEGIN')

    const userId = await resolveUserId(client, authorId, config.defaults.demoUserEmail)

    const noteResult = await client.query(
      `
      INSERT INTO notes (title, body, author_id, class_id, course_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING note_id
      `,
      [title.trim(), content.trim(), userId, classId, courseId],
    )

    const noteId = noteResult.rows[0].note_id

    const tagIds = await ensureTags(client, tags)
    for (const tagId of tagIds) {
      await client.query(
        `
        INSERT INTO note_tags (note_id, tag_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [noteId, tagId],
      )
    }

    const created = await client.query(`${NOTE_SELECT} WHERE n.note_id = $1`, [noteId])

    await client.query('COMMIT')
    res.status(201).json(created.rows[0])
  } catch (error) {
    await client.query('ROLLBACK')
    next(error)
  } finally {
    client.release()
  }
})

notesRouter.get('/notes/:noteId/comments', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        c.comment_id AS id,
        c.body,
        c.created_at AS "createdAt",
        json_build_object('id', u.user_id, 'displayName', u.display_name) AS author
      FROM note_comments c
      JOIN users u ON u.user_id = c.author_id
      WHERE c.note_id = $1
      ORDER BY c.created_at ASC
      `,
      [req.params.noteId],
    )

    res.json(rows)
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/notes/:noteId/comments', async (req, res, next) => {
  const client = await pool.connect()

  try {
    const { body, authorId = null } = req.body || {}
    if (!body || !body.trim()) {
      return res.status(400).json({ message: 'body is required' })
    }

    const noteCheck = await client.query('SELECT note_id FROM notes WHERE note_id = $1', [req.params.noteId])
    if (noteCheck.rowCount === 0) {
      return res.status(404).json({ message: 'Note not found' })
    }

    const userId = await resolveUserId(client, authorId, config.defaults.demoUserEmail)
    const { rows } = await client.query(
      `
      INSERT INTO note_comments (note_id, author_id, body)
      VALUES ($1, $2, $3)
      RETURNING comment_id AS id, body, created_at AS "createdAt"
      `,
      [req.params.noteId, userId, body.trim()],
    )

    res.status(201).json(rows[0])
  } catch (error) {
    next(error)
  } finally {
    client.release()
  }
})

notesRouter.post('/notes/:noteId/ratings', async (req, res, next) => {
  const client = await pool.connect()

  try {
    const { rating, userId = null } = req.body || {}
    const numericRating = Number(rating)

    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'rating must be an integer between 1 and 5' })
    }

    const noteCheck = await client.query('SELECT note_id FROM notes WHERE note_id = $1', [req.params.noteId])
    if (noteCheck.rowCount === 0) {
      return res.status(404).json({ message: 'Note not found' })
    }

    const resolvedUserId = await resolveUserId(client, userId, config.defaults.demoUserEmail)

    await client.query(
      `
      INSERT INTO note_ratings (note_id, user_id, rating)
      VALUES ($1, $2, $3)
      ON CONFLICT (note_id, user_id)
      DO UPDATE SET rating = EXCLUDED.rating, created_at = NOW()
      `,
      [req.params.noteId, resolvedUserId, numericRating],
    )

    const updated = await client.query(`${NOTE_SELECT} WHERE n.note_id = $1`, [req.params.noteId])
    res.json(updated.rows[0])
  } catch (error) {
    next(error)
  } finally {
    client.release()
  }
})

module.exports = { notesRouter }
