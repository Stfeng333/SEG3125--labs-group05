# Project structure added for next week database integration

- `src/pages/`: blank page templates
- `src/types/models.ts`: shared TypeScript interfaces for notes, requests, classes, and courses
- `src/config/env.ts`: environment configuration (`VITE_API_BASE_URL`)
- `src/lib/apiClient.ts`: reusable fetch client
- `src/services/`: API service modules (notes, requests, communities)

## Environment setup

1. Copy `.env.example` to `.env`.
2. Set your backend URL:

```bash
VITE_API_BASE_URL=http://localhost:4000/api
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Teammate quick guide
- Page layout work: `src/pages/` (see `TEAM TODO` comments in each page file).
- Routing and flow mapping: `src/App.tsx`.
- Shared data types: `src/types/models.ts`.
- API integration and database wiring: `src/services/` + `src/lib/apiClient.ts`.
- Backend URL config: `.env` from `.env.example`.
