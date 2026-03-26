const { Pool } = require('pg')
const { config } = require('../config')

const pool = new Pool(config.db)

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error)
})

module.exports = { pool }
