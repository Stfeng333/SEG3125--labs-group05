const { pool } = require('./pool')

async function runSeed() {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    await client.query(`
      INSERT INTO users (display_name, email)
      VALUES
        ('Steven', 'student1@uottawa.ca'),
        ('Sahara', 'student2@uottawa.ca'),
        ('Ahmed', 'student3@uottawa.ca')
      ON CONFLICT (email) DO NOTHING
    `)

    await client.query(`
      INSERT INTO classes (class_code, class_name)
      VALUES
        ('SEG3125', 'Analysis and Design of User Interfaces'),
        ('CSI2101', 'Discrete Structures'),
        ('SEG2105', 'Intro to Software Engineering')
      ON CONFLICT (class_code) DO NOTHING
    `)

    await client.query(`
      INSERT INTO courses (class_id, course_code, course_name)
      SELECT c.class_id, v.course_code, v.course_name
      FROM (
        VALUES
          ('SEG3125', 'UI-DESIGN', 'User Interface Design'),
          ('CSI2101', 'DISCRETE', 'Discrete Structures'),
          ('SEG2105', 'SE-BASICS', 'Software Engineering Basics')
      ) AS v(class_code, course_code, course_name)
      JOIN classes c ON c.class_code = v.class_code
      ON CONFLICT (course_code) DO NOTHING
    `)

    await client.query(`
      INSERT INTO tags (tag_name)
      VALUES
        ('sorting'),
        ('algorithms'),
        ('heuristics'),
        ('usability')
      ON CONFLICT (tag_name) DO NOTHING
    `)

    const noteInsert = await client.query(`
      INSERT INTO notes (title, body, author_id, class_id, course_id)
      SELECT
        'Heuristic Evaluation Summary',
        'These are structured notes for Nielsen heuristics with practical examples.',
        u.user_id,
        cl.class_id,
        co.course_id
      FROM users u
      CROSS JOIN classes cl
      CROSS JOIN courses co
      WHERE u.email = 'student1@uottawa.ca'
        AND cl.class_code = 'SEG3125'
        AND co.course_code = 'UI-DESIGN'
      ON CONFLICT DO NOTHING
      RETURNING note_id
    `)

    const noteId = noteInsert.rows[0]?.note_id
    if (noteId) {
      await client.query(
        `
        INSERT INTO note_tags (note_id, tag_id)
        SELECT $1, t.tag_id
        FROM tags t
        WHERE t.tag_name IN ('heuristics', 'usability')
        ON CONFLICT DO NOTHING
        `,
        [noteId],
      )
    }

    const requestInsert = await client.query(`
      INSERT INTO requests (title, body, status, created_by, class_id, course_id)
      SELECT
        'Need lecture 3 notes',
        'Missed lecture 3. Looking for complete notes and diagrams.',
        'open',
        u.user_id,
        cl.class_id,
        co.course_id
      FROM users u
      CROSS JOIN classes cl
      CROSS JOIN courses co
      WHERE u.email = 'student2@uottawa.ca'
        AND cl.class_code = 'SEG3125'
        AND co.course_code = 'UI-DESIGN'
      ON CONFLICT DO NOTHING
      RETURNING request_id
    `)

    const requestId = requestInsert.rows[0]?.request_id
    if (requestId) {
      await client.query(
        `
        INSERT INTO request_tags (request_id, tag_id)
        SELECT $1, t.tag_id
        FROM tags t
        WHERE t.tag_name IN ('heuristics')
        ON CONFLICT DO NOTHING
        `,
        [requestId],
      )
    }

    await client.query('COMMIT')
    console.log('Seed complete.')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Seed failed:', error)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

runSeed()
