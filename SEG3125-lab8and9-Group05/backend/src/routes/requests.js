const express = require('express')
const { pool } = require('../db/pool')
const { config } = require('../config')
const { ensureTags, resolveUserId } = require('../db/helpers')

const requestsRouter = express.Router()

const REQUEST_SELECT = `
  SELECT
    r.request_id AS id,
    r.title,
    r.body AS details,
    r.class_id AS "classId",
    r.course_id AS "courseId",
    r.created_at AS "createdAt",
    r.status,
    json_build_object(
      'id', u.user_id,
      'displayName', u.display_name
    ) AS "createdBy",
    COALESCE(
      (
        SELECT array_agg(t.tag_name ORDER BY t.tag_name)
        FROM request_tags rt
        JOIN tags t ON t.tag_id = rt.tag_id
        WHERE rt.request_id = r.request_id
      ),
      '{}'::text[]
    ) AS tags
  FROM requests r
  JOIN users u ON u.user_id = r.created_by
`

requestsRouter.get('/requests', async (_req, res, next) => {
  try {
    const { rows } = await pool.query(`${REQUEST_SELECT} ORDER BY r.created_at DESC`)
    res.json(rows)
  } catch (error) {
    next(error)
  }
})

requestsRouter.get('/requests/:requestId', async (req, res, next) => {
  try {
    const { rows } = await pool.query(`${REQUEST_SELECT} WHERE r.request_id = $1`, [req.params.requestId])
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Request not found' })
    }

    res.json(rows[0])
  } catch (error) {
    next(error)
  }
})

requestsRouter.post('/requests', async (req, res, next) => {
  const client = await pool.connect()

  try {
    const { title, details, tags = [], classId = null, courseId = null, createdById = null } = req.body || {}

    if (!title || !details) {
      return res.status(400).json({ message: 'title and details are required' })
    }

    await client.query('BEGIN')

    const userId = await resolveUserId(client, createdById, config.defaults.demoUserEmail)

    const requestResult = await client.query(
      `
      INSERT INTO requests (title, body, created_by, class_id, course_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING request_id
      `,
      [title.trim(), details.trim(), userId, classId, courseId],
    )

    const requestId = requestResult.rows[0].request_id

    const tagIds = await ensureTags(client, tags)
    for (const tagId of tagIds) {
      await client.query(
        `
        INSERT INTO request_tags (request_id, tag_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [requestId, tagId],
      )
    }

    const created = await client.query(`${REQUEST_SELECT} WHERE r.request_id = $1`, [requestId])

    await client.query('COMMIT')
    res.status(201).json(created.rows[0])
  } catch (error) {
    await client.query('ROLLBACK')
    next(error)
  } finally {
    client.release()
  }
})

requestsRouter.get('/requests/:requestId/replies', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        rp.reply_id AS id,
        rp.body,
        rp.created_at AS "createdAt",
        json_build_object('id', u.user_id, 'displayName', u.display_name) AS author
      FROM replies rp
      JOIN users u ON u.user_id = rp.author_id
      WHERE rp.request_id = $1
      ORDER BY rp.created_at ASC
      `,
      [req.params.requestId],
    )

    res.json(rows)
  } catch (error) {
    next(error)
  }
})

requestsRouter.post('/requests/:requestId/replies', async (req, res, next) => {
  const client = await pool.connect()

  try {
    const { body, authorId = null } = req.body || {}
    if (!body || !body.trim()) {
      return res.status(400).json({ message: 'body is required' })
    }

    const requestCheck = await client.query('SELECT request_id FROM requests WHERE request_id = $1', [
      req.params.requestId,
    ])
    if (requestCheck.rowCount === 0) {
      return res.status(404).json({ message: 'Request not found' })
    }

    const userId = await resolveUserId(client, authorId, config.defaults.demoUserEmail)

    const { rows } = await client.query(
      `
      INSERT INTO replies (request_id, author_id, body)
      VALUES ($1, $2, $3)
      RETURNING reply_id AS id, body, created_at AS "createdAt"
      `,
      [req.params.requestId, userId, body.trim()],
    )

    res.status(201).json(rows[0])
  } catch (error) {
    next(error)
  } finally {
    client.release()
  }
})

module.exports = { requestsRouter }
