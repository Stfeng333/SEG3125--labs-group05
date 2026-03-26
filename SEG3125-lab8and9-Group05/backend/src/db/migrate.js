const fs = require('fs')
const path = require('path')
const { pool } = require('./pool')

async function runMigrations() {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    const migrationsDir = path.resolve(process.cwd(), 'migrations')
    const files = fs
      .readdirSync(migrationsDir)
      .filter((name) => name.endsWith('.sql'))
      .sort((a, b) => a.localeCompare(b))

    for (const filename of files) {
      const alreadyApplied = await client.query(
        'SELECT 1 FROM schema_migrations WHERE filename = $1',
        [filename],
      )

      if (alreadyApplied.rowCount > 0) {
        console.log(`Skipping already applied migration: ${filename}`)
        continue
      }

      const sql = fs.readFileSync(path.join(migrationsDir, filename), 'utf8')
      console.log(`Applying migration: ${filename}`)
      await client.query(sql)
      await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [filename])
    }

    await client.query('COMMIT')
    console.log('Migrations complete.')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Migration failed:', error)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

runMigrations()
