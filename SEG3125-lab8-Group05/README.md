# SEG 3125 - lab 8 - Group05
This lab is based on implementing the website that was designed for lab 7
The choice that group 05 has decided to work on is a web app with React
Description of website: making knowledge sharing easy, fast, and organized for everyone. Encouraging users to:
- Post notes about one or multiple topics/subjects
- Request notes on topics they need help with
- Reply to requests by sharing their own notes
- Join “Classes” and “Courses” to access structures collections of notes

NOTE: Most of the functionality will be implemented for the last lab, since it requires the database
---

## How to run this project (for developers)

### Prerequisites
- Install Node.js (recommended: LTS version 20 or later).
- Ensure npm is available (comes with Node.js).

### Local setup
1. Open a terminal at `SEG3125-lab8-Group05`.
2. Move into the React app folder:
	 `cd my-react-app`
3. Install dependencies:
	 `npm install`

### Run in development mode
- Start the Vite development server:
	`npm run dev`
- Open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build for production
- Create a production build:
	`npm run build`

### Preview the production build locally
- Serve the built files locally:
	`npm run preview`

### Optional quality check
- Run ESLint:
	`npm run lint`

## Team Work Guide (Where to work)

Use this section to split work by feature without editing everything at once.

### 1 UI and page layouts (teammates implementing sketches)
- Go to `my-react-app/src/pages/`.
- Each file in this folder is a blank template page and already has a `TEAM TODO` comment.
- Build page content/components in these files:
	- `HomePage.tsx`
	- `NotesPage.tsx`
	- `NoteDetailsPage.tsx`
	- `RequestsPage.tsx`
	- `RequestDetailsPage.tsx`
	- `ClassesPage.tsx`
	- `CoursesPage.tsx`
	- `CourseDetailsPage.tsx`

### 2 Route map and navigation flow
- Go to `my-react-app/src/App.tsx`.
- Route paths are already set and grouped with `TEAM TODO` comments.
- If you add a new page, add the route here.

### 3 Shared data models (team alignment)
- Go to `my-react-app/src/types/models.ts`.
- Update interfaces only when the team agrees on data shape changes.
- Keep this file synced with backend/database fields.

### 4 API/database integration (next week)
- Go to `my-react-app/src/services/` and `my-react-app/src/lib/apiClient.ts`.
- Service files already include `TEAM TODO` comments for backend wiring:
	- `notesService.ts`
	- `requestsService.ts`
	- `communitiesService.ts`
- Configure backend URL in `.env` using `.env.example`:
	- `VITE_API_BASE_URL=http://localhost:4000/api`

### 5 Global styles and app-wide styling system
- Global reset/base styles: `my-react-app/src/index.css`
- Template-level styles: `my-react-app/src/App.css`
- Teammates can add shared tokens/variables here when design is finalized.

The contributions were equal, the repository will be posted in the GitHub classroom of the course, and the personal repository is Stfeng333... https://github.com/Stfeng333/SEG3125--labs-group05 

The website itself is published on: 


**Contributions per member**
- Contribution percentage: 1/3 by Ahmed Salma (implemented design of homepage, classes page, course details, course page, notes detail page), 1/3 by Sahara Sammy (implemented the design of notes page, page templates, requests page, request details, and the database diagram), 1/3 by Steven Feng Peng (set up React into the project, implemented the base/backbone/backend fundamentals of the website, wrote the README.md file for the team/developers/readers to understand how to run the project, made the PDF)