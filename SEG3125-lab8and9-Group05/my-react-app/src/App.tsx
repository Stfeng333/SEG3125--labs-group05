import { Navigate, Route, Routes } from 'react-router-dom'
import { ClassesPage } from './pages/ClassesPage'
import { CourseDetailsPage } from './pages/CourseDetailsPage'
import { CoursesPage } from './pages/CoursesPage'
import { HomePage } from './pages/HomePage'
import { NoteDetailsPage } from './pages/NoteDetailsPage'
import { NotesPage } from './pages/NotesPage'
import { RequestDetailsPage } from './pages/RequestDetailsPage'
import { RequestsPage } from './pages/RequestsPage'

function App() {
  return (
    <Routes>
      {/* TEAM TODO (UI): Implement page layouts/components for each route below. */}
      <Route path="/" element={<HomePage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/notes/:noteId" element={<NoteDetailsPage />} />
      <Route path="/requests" element={<RequestsPage />} />
      <Route path="/requests/:requestId" element={<RequestDetailsPage />} />
      {/* TEAM TODO (Content IA): Build class/course community browsing screens. */}
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
