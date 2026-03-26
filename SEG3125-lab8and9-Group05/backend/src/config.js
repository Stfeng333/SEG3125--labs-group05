const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

function required(name, fallback) {
  const value = process.env[name] || fallback
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

const config = {
  app: {
    port: Number(process.env.PORT || 4000),
    frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  },
  db: {
    host: required('DB_HOST', '127.0.0.1'),
    port: Number(required('DB_PORT', '5432')),
    database: required('DB_NAME', 'notehub_dev'),
    user: required('DB_USER', 'notehub_admin'),
    password: required('DB_PASSWORD'),
  },
  defaults: {
    demoUserEmail: process.env.DEMO_USER_EMAIL || 'student1@uottawa.ca',
  },
}

module.exports = { config }
