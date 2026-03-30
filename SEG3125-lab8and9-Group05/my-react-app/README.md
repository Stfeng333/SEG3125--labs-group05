# NoteHub frontend (React + Vite)

This is the UI client for our website

## Prerequisites

- Node.js 20+ and npm
- Backend API running on http://localhost:4000

## Setup

Copy .env.example to .env:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

## Run frontend

```powershell
cd my-react-app
npm install
npm run dev
```

Open http://localhost:5173

## Build

```powershell
npm run build
```

---
### Add the bilingual support (English + French) requirement

1. Install i18n:

   ```powershell
   npm install i18next react-i18next
   ```

2. Create `src/locales/en/translation.json` and `src/locales/fr/translation.json`:

   ```json
   {
     "home": { "title": "Welcome to NoteHub" },
     "notes": { "post": "Post a Note" },
     "common": { "submit": "Submit" }
   }
   ```

3. Initialize in `src/main.tsx` (before createRoot):

   ```javascript
   import i18n from 'i18next'
   import { initReactI18next } from 'react-i18next'
   import en from './locales/en/translation.json'
   import fr from './locales/fr/translation.json'

   i18n.use(initReactI18next).init({
     resources: { en: { translation: en }, fr: { translation: fr } },
     lng: localStorage.getItem('language') || 'en',
     fallbackLng: 'en',
     interpolation: { escapeValue: false },
   })
   ```

4. Use in components:

   ```jsx
   import { useTranslation } from 'react-i18next'

   export function HomePage() {
     const { t, i18n } = useTranslation()
     return (
       <>
         <h1>{t('home.title')}</h1>
         <select
           value={i18n.language}
           onChange={(e) => {
             i18n.changeLanguage(e.target.value)
             localStorage.setItem('language', e.target.value)
           }}
         >
           <option value="en">English</option>
           <option value="fr">Français</option>
         </select>
       </>
     )
   }
   ```
