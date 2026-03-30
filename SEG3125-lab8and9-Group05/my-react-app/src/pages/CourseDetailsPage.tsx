import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { communitiesService, notesService } from '../services'
import type { CourseCommunity, Note } from '../types/models'
import { PageTemplate } from './PageTemplate'


export function CourseDetailsPage() {
  const { t, i18n } = useTranslation()
  const { courseId } = useParams()
  const [course, setCourse] = useState<CourseCommunity | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) {
      setLoading(false)
      setErrorMessage(t('courseDetails.errors.invalidId'))
      return
    }
    const currentCourseId = courseId

    async function loadData() {
      try {
        setLoading(true)
        setErrorMessage(null)
        const [courseResponse, notesResponse] = await Promise.all([
          communitiesService.getCourseById(currentCourseId),
          notesService.list({ courseId: currentCourseId }),
        ])
        setCourse(courseResponse)
        setNotes(notesResponse)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : t('courseDetails.errors.loadCourse'))      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [courseId])

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

  return (
    <PageTemplate
      name={course ? `${course.code} - ${course.name}` : t('courseDetails.title')}
      subtitle={t('courseDetails.subtitle')}
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
          placeholder={t('courseDetails.searchPlaceholder')}
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
            {t('courseDetails.loading')}
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
                {t('courseDetails.by')} {note.author.displayName}
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
                  {note.commentsCount || 0} {t('courseDetails.comments')}
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
          {t('courseDetails.noNotes')}
        </section>
      ) : null}
    </PageTemplate>
  )
}