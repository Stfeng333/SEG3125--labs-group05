# NoteHub backend

Express API for NoteHub, connected to PostgreSQL.

## Prerequisites

- Node.js 20+ and npm
- Docker Desktop running
- PostgreSQL container started from project root

## Setup

Copy backend/.env.example to backend/.env and set values (minimum):

```env
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=notehub_dev
DB_USER=notehub_admin
DB_PASSWORD=<matches POSTGRES_PASSWORD from .env.local>
```

## Run backend

```powershell
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Check: http://localhost:4000/api/health

## Team Notes

- **Backend developers**: do not modify `src/routes/`, `src/db/`, or `src/config.js` unless fixing bugs
- **Database changes**: create new migration files in `backend/migrations/` (do not edit old files)
- After pulling new schema changes: run `npm run db:migrate`
