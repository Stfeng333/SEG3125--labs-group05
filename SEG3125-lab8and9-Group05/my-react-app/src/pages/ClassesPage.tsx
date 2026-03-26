import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { communitiesService, notesService } from '../services'
import type { ClassCommunity, Note } from '../types/models'
import { PageTemplate } from './PageTemplate'

export function ClassesPage() {
  const [classes, setClasses] = useState<ClassCommunity[]>([])
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadClasses() {
      try {
        const response = await communitiesService.listClasses()
        setClasses(response)
        if (response.length > 0) {
          setSelectedClassId(response[0].id)
        }
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load classes.')
      }
    }

    void loadClasses()
  }, [])

  useEffect(() => {
    if (!selectedClassId) return
    const currentClassId = selectedClassId

    async function loadNotes() {
      try {
        setLoading(true)
        setErrorMessage(null)
        const response = await notesService.list({ classId: currentClassId })
        setNotes(response)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load class notes.')
      } finally {
        setLoading(false)
      }
    }

    void loadNotes()
  }, [selectedClassId])

  const visibleNotes = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase()
    if (!normalizedQuery) {
      return notes
    }

    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(normalizedQuery) ||
        note.preview.toLowerCase().includes(normalizedQuery) ||
        note.author.displayName.toLowerCase().includes(normalizedQuery) ||
        note.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      )
    })
  }, [notes, search])

  const selectedClass = classes.find((item) => item.id === selectedClassId)

  return (
    <PageTemplate
      name={selectedClass ? `${selectedClass.code} - ${selectedClass.name}` : 'Classes'}
      subtitle="Browse notes shared within this class and explore content by topic or author."
    >
      <section style={{ marginBottom: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {classes.map((item) => {
          const selected = item.id === selectedClassId
          return (
            <button
              key={item.id}
              onClick={() => setSelectedClassId(item.id)}
              style={{
                padding: '10px 14px',
                borderRadius: '999px',
                border: selected ? '1px solid #323436' : '1px solid #e5e7eb',
                backgroundColor: selected ? '#eae9e9' : '#ffffff',
                color: '#111827',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              {item.code}
            </button>
          )
        })}
      </section>

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
          placeholder="Search notes, authors, or topics"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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

      {errorMessage ? (
        <section
          style={{
            marginBottom: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid #fecaca',
            borderRadius: '20px',
            padding: '20px',
            color: '#b91c1c',
          }}
        >
          {errorMessage}
        </section>
      ) : null}

      <section style={{ display: 'grid', gap: '20px' }}>
        {loading ? (
          <article
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '20px',
              padding: '20px',
              color: '#6b7280',
            }}
          >
            Loading class notes...
          </article>
        ) : null}

        {visibleNotes.map((note) => (
          <Link key={note.id} to={`/notes/${note.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <article
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                padding: '22px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              }}
            >
              <h2 style={{ margin: '0 0 6px 0', fontSize: '1.4rem', fontWeight: 700 }}>{note.title}</h2>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#111827' }}>
                By: {note.author.displayName}
              </p>

              <p style={{ margin: '0 0 14px 0', lineHeight: 1.6, color: '#374151' }}>{note.preview}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.8rem',
                        padding: '6px 10px',
                        borderRadius: '999px',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>
                    ★ {Number(note.rating || 0).toFixed(1)}
                  </span>
                </div>

                <span style={{ fontSize: '0.95rem', color: '#4b5563' }}>
                  {note.commentsCount || 0} comments
                </span>
              </div>
            </article>
          </Link>
        ))}
      </section>

      {!loading && visibleNotes.length === 0 ? (
        <section
          style={{
            marginTop: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            padding: '20px',
            color: '#6b7280',
          }}
        >
          No notes found for this class.
        </section>
      ) : null}
    </PageTemplate>
  )
}