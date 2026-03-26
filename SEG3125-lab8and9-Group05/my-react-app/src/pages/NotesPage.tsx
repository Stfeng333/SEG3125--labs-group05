import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageTemplate } from './PageTemplate'

const notes = [
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
  {
    id: '3',
    title: 'React Hooks Deep Dive',
    preview: 'Understand state and effects in modern React apps.',
    tags: ['React', 'Frontend'],
    author: 'User3',
  },
]

export function NotesPage() {
  const [query, setQuery] = useState('')

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) return notes

    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(normalizedQuery) ||
        note.preview.toLowerCase().includes(normalizedQuery) ||
        note.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
        note.author.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [query])

  return (
    <PageTemplate
      name="Topic Tags"
      subtitle="Browse notes by keywords and quickly open the most relevant ones."
    >
      <section
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Search notes, topics, or authors"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          style={{
            width: '100%',
            maxWidth: '520px',
            padding: '14px 16px',
            fontSize: '0.95rem',
            borderRadius: '14px',
            border: '1px solid #d1d5db',
            outline: 'none',
            backgroundColor: '#f9fafb',
          }}
        />
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '18px',
        }}
      >
        {filteredNotes.map((note) => (
          <article
            key={note.id}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
          >
            <h2
              style={{
                margin: '0 0 10px 0',
                fontSize: '1.35rem',
                fontWeight: 700,
              }}
            >
              {note.title}
            </h2>

            <p
              style={{
                margin: '0 0 12px 0',
                color: '#6b7280',
                lineHeight: 1.6,
                fontSize: '0.95rem',
              }}
            >
              {note.preview}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '14px',
              }}
            >
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.78rem',
                    padding: '5px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p
              style={{
                margin: '0 0 12px 0',
                color: '#4b5563',
                fontWeight: 500,
                fontSize: '0.9rem',
              }}
            >
              By {note.author}
            </p>

            <Link
              to={`/notes/${note.id}`}
              style={{
                color: '#111827',
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: '1px solid #111827',
                paddingBottom: '1px',
              }}
            >
              View note
            </Link>
          </article>
        ))}
      </section>

      {filteredNotes.length === 0 ? (
        <section
          style={{
            marginTop: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            padding: '20px',
            color: '#6b7280',
          }}
        >
          No notes match this search. Try broader tags or another keyword.
        </section>
      ) : null}
    </PageTemplate>
  )
}
