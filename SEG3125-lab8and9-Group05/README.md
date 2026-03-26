# SEG3125-lab9-group05

NoteHub is a React + Node + PostgreSQL app for posting/requesting/sharing notes. As a user, you can also join classes/courses
to be part of specific notes communities, rate notes, reply to requests, have your own profile, and explore

## Prerequisites you need to have installed

- Node.js 20+ and npm
- Docker Desktop

## Required local env files

- Root: .env.local (contains POSTGRES_PASSWORD)
- Backend: backend/.env
- Frontend: my-react-app/.env

Important: backend/.env DB_PASSWORD must match POSTGRES_PASSWORD in .env.local.

## Run the project

1. Start database from root terminal

Example, in my machine I run the command in powershell:

```powershell
cd "C:\UOTTAWA\Winter 2026\SEG 3125 Analysis and Design UI\Labssss\SEG3125--labs-group05\SEG3125-lab8and9-Group05"
docker compose --env-file .env.local up -d
```

2. Start backend API from backend terminal

```powershell
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

3. Start frontend from my-react-app terminal

```powershell
cd my-react-app
npm install
npm run dev
```

4. Open app

- Frontend: http://localhost:5173
- Backend health: http://localhost:4000/api/health

## Stop the project

Press Ctrl + C in each terminal, then from the root terminal:

```powershell
docker compose down
```

## Teammate Guide

### Edit UI Visuals

- **Global styles**: `my-react-app/src/index.css`, `my-react-app/src/App.css`
- **Page layouts**: `my-react-app/src/pages/*.tsx` (any .tsx file)
- **Layout template**: `my-react-app/src/pages/PageTemplate.tsx`

### To add Bootstrap components

1. Install: `cd my-react-app && npm install bootstrap`
2. Import in page file: `import 'bootstrap/dist/css/bootstrap.min.css'`
3. Use Bootstrap classes: `<div className="container"><div className="row"><div className="col-md-6">...</div></div></div>`
4. View all components: https://getbootstrap.com/docs/5.3/components/

### To add Bilingualism feature (English + French)

1. Install i18n: `cd my-react-app && npm install i18next react-i18next`
2. Create `my-react-app/src/locales/` with two files:
   - `en/translation.json` (English strings)
   - `fr/translation.json` (French strings)
3. Initialize i18n in `my-react-app/src/main.tsx`:

   ```javascript
   import i18n from 'i18next'
   import { initReactI18next } from 'react-i18next'
   import en from './locales/en/translation.json'
   import fr from './locales/fr/translation.json'

   i18n.use(initReactI18next).init({
     resources: { en: { translation: en }, fr: { translation: fr } },
     lng: 'en',
     interpolation: { escapeValue: false },
   })
   ```

4. Use in components:

   ```javascript
   import { useTranslation } from 'react-i18next'

   export function HomePage() {
     const { t, i18n } = useTranslation()
     return (
       <>
         <h1>{t('home.title')}</h1>
         <button onClick={() => i18n.changeLanguage('fr')}>Français</button>
       </>
     )
   }
   ```

5. Translation file format (en/translation.json):
   ```json
   {
     "home": { "title": "Welcome to NoteHub" },
     "notes": { "post": "Post a Note" }
   }
   ```

### Internationalization Best Practices

- Keep all UI text in translation files, not hardcoded
- Add translations before teammates translate
- Test both languages before pushing

### Keep Functionality Intact

- Only edit CSS, HTML structure, and text
- Try to improve logic, API calls, or data types
