import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { communitiesService, notesService } from '../services'
import type { CourseCommunity, Note } from '../types/models'
import { PageTemplate } from './PageTemplate'

export function CoursesPage() {
  const [courses, setCourses] = useState<CourseCommunity[]>([])
  const [allNotes, setAllNotes] = useState<Note[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setErrorMessage(null)
        const [coursesResponse, notesResponse] = await Promise.all([
          communitiesService.listCourses(),
          notesService.list(),
        ])
        setCourses(coursesResponse)
        setAllNotes(notesResponse)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load courses.')
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [])

  const visibleCourses = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase()
    if (!normalizedQuery) {
      return courses
    }
    return courses.filter((course) => {
      return (
        course.code.toLowerCase().includes(normalizedQuery) ||
        course.name.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [courses, search])

  const noteCountByCourse = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const note of allNotes) {
      if (!note.courseId) continue
      counts[note.courseId] = (counts[note.courseId] || 0) + 1
    }
    return counts
  }, [allNotes])

  return (
    <PageTemplate
      name="Explore Courses"
      subtitle="Browse available course spaces and open each one to view notes and activity."
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
          placeholder="Search courses"
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

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
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
            Loading courses...
          </article>
        ) : null}

        {visibleCourses.map((course) => (
          <Link key={course.id} to={`/courses/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <article
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                padding: '22px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                height: '100%',
              }}
            >
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.3rem', fontWeight: 700 }}>
                {course.code} - {course.name}
              </h2>
              <p style={{ margin: '0 0 18px 0', color: '#6b7280', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Open this course to browse all notes associated with it.
              </p>
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '14px', color: '#4b5563' }}>
                {noteCountByCourse[course.id] || 0} notes
              </div>
            </article>
          </Link>
        ))}
      </section>

      {!loading && visibleCourses.length === 0 ? (
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
          No courses found for this search.
        </section>
      ) : null}
    </PageTemplate>
  )
}