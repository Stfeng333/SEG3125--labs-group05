import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { notesService } from '../services'
import type { Note } from '../types/models'
import { PageTemplate } from './PageTemplate'

export function HomePage() {
  const { t, i18n } = useTranslation()
  const [query, setQuery] = useState('')
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true)
        setErrorMessage(null)
        const response = await notesService.list()
        setNotes(response)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : t('home.errors.loadNotes'))
      } finally {
        setLoading(false)
      }
    }

    void loadNotes()
  }, [])

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return notes.slice(0, 8)
    }

    return notes
      .filter((note) => {
        return (
          note.title.toLowerCase().includes(normalizedQuery) ||
          note.preview.toLowerCase().includes(normalizedQuery) ||
          note.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
          note.author.displayName.toLowerCase().includes(normalizedQuery)
        )
      })
      .slice(0, 8)
  }, [notes, query])

  return (
    <PageTemplate
      name={t('home.title')}
      subtitle={t('home.subtitle')}
    >
      <section style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
        <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
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
          placeholder={t('home.searchPlaceholder')}
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

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '18px',
        }}
      >
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
            {t('home.loading')}
          </article>
        ) : null}

        {filteredNotes.map((note) => (
          <Link
            key={note.id}
            to={`/notes/${note.id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <article
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                padding: '18px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                height: '100%',
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 700 }}>{note.title}</h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', lineHeight: 1.55, color: '#6b7280' }}>
                {note.preview}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.75rem',
                      padding: '5px 9px',
                      borderRadius: '999px',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p style={{ margin: 0, fontSize: '0.85rem', color: '#4b5563', fontWeight: 500 }}>
                {t('home.by')} {note.author.displayName}
              </p>
            </article>
          </Link>
        ))}
      </section>

      {!loading && filteredNotes.length === 0 ? (
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
          {t('home.noNotes')}
        </section>
      ) : null}
    </PageTemplate>
  )
}
