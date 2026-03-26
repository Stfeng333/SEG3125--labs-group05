const express = require('express')
const { pool } = require('../db/pool')

const communitiesRouter = express.Router()

communitiesRouter.get('/classes', async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT class_id AS id, class_code AS code, class_name AS name
      FROM classes
      ORDER BY class_code ASC
      `,
    )

    res.json(rows)
  } catch (error) {
    next(error)
  }
})

communitiesRouter.get('/courses', async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        c.course_id AS id,
        c.course_code AS code,
        c.course_name AS name,
        c.class_id AS "classId"
      FROM courses c
      ORDER BY c.course_code ASC
      `,
    )

    res.json(rows)
  } catch (error) {
    next(error)
  }
})

communitiesRouter.get('/courses/:courseId', async (req, res, next) => {
  try {
    const { courseId } = req.params
    const { rows } = await pool.query(
      `
      SELECT
        c.course_id AS id,
        c.course_code AS code,
        c.course_name AS name,
        c.class_id AS "classId"
      FROM courses c
      WHERE c.course_id = $1
      `,
      [courseId],
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' })
    }

    res.json(rows[0])
  } catch (error) {
    next(error)
  }
})

module.exports = { communitiesRouter }
