import { Link } from 'react-router-dom'
import { PageTemplate } from './PageTemplate'

const mockNotes = [
  {
    id: '1',
    title: 'Understanding JavaScript Promises',
    preview: 'An in-depth explanation of how promises work.',
    tags: ['JavaScript', 'Async'],
    author: 'Jane Doe',
  },
  {
    id: '2',
    title: 'CSS Grid Layout',
    preview: 'A guide to using CSS Grid.',
    tags: ['CSS', 'Layout'],
    author: 'John Smith',
  },
]

export function NotesPage() {
  return (
    <PageTemplate name="Notes">
      <input type="text" placeholder="Search notes..." />

      <div style={{ marginTop: '1rem' }}>
        {mockNotes.map((note) => (
          <article
            key={note.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}
          >
            <h2>{note.title}</h2>
            <p>{note.preview}</p>
            <p>{note.tags.join(', ')}</p>
            <small>By {note.author}</small>
            <br />
            <Link to={`/notes/${note.id}`}>View note</Link>
          </article>
        ))}
      </div>
    </PageTemplate>
  )
}