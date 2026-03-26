import { Link } from 'react-router-dom'

export function CoursesPage() {
  const classItems = ['SEG3125', 'CSI2101', 'SEG2105']
  const courseItems = ['User Interface', 'Data Structures', 'Discrete Structures']
  const topicTags = ['#sorting', '#algorithms', '#linear algebra']

  const courses = [
    {
      id: 'csi2101',
      title: 'CSI 2101 - Discrete Structures',
      description: 'Explore notes, topics, and shared materials for this course.',
      noteCount: '24 notes',
    },
    {
      id: 'seg3125',
      title: 'SEG 3125 - UI Analysis',
      description: 'Browse design notes, project references, and usability resources.',
      noteCount: '18 notes',
    },
    {
      id: 'iti1120',
      title: 'ITI 1120 - Introduction to Computing',
      description: 'Find summaries, examples, and beginner-friendly computing notes.',
      noteCount: '31 notes',
    },
  ]

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f6f7f9',
        color: '#111827',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <aside
        style={{
          width: '240px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          padding: '32px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginBottom: '20px',
            fontSize: '0.9rem',
            color: '#141415',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          ← Back to Dashboard
        </Link>

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Notehub
          </h2>
        </div>

        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 700 }}>Classes</h3>
          <div
            style={{
              marginBottom: '10px',
              padding: '10px 12px',
              borderRadius: '12px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              color: '#6b7280',
              fontSize: '0.92rem',
            }}
          >
            + Join a class
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {classItems.map((item) => (
              <button
                key={item}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid transparent',
                  backgroundColor: 'transparent',
                  color: '#374151',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 700 }}>Courses</h3>
          <div
            style={{
              marginBottom: '10px',
              padding: '10px 12px',
              borderRadius: '12px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              color: '#6b7280',
              fontSize: '0.92rem',
            }}
          >
            + Join a course
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {courseItems.map((item, index) => (
              <button
                key={item}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: index === 2 ? '1px solid #dbeafe' : '1px solid transparent',
                  backgroundColor: index === 2 ? '#eff6ff' : 'transparent',
                  color: index === 2 ? '#1d4ed8' : '#374151',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 700 }}>Topics Tags</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {topicTags.map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  color: '#374151',
                  fontSize: '0.92rem',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '40px 48px' }}>
        <section
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <div>
            
              <h1
                style={{
                  margin: '8px 0 10px 0',
                  fontSize: '2.4rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                Explore Courses
              </h1>

              <p
                style={{
                  margin: 0,
                  color: '#6b7280',
                  fontSize: '0.98rem',
                  lineHeight: 1.6,
                  maxWidth: '620px',
                }}
              >
                Browse available course spaces and open each one to view notes and activity.
              </p>
            </div>

            <div style={{ minWidth: '260px', flex: 1, maxWidth: '420px' }}>
              <input
                type="text"
                placeholder="Search courses"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '0.95rem',
                  borderRadius: '14px',
                  border: '1px solid #d1d5db',
                  outline: 'none',
                  backgroundColor: '#f9fafb',
                }}
              />
            </div>
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
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
                <h2
                  style={{
                    margin: '0 0 10px 0',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {course.title}
                </h2>

                <p
                  style={{
                    margin: '0 0 18px 0',
                    color: '#6b7280',
                    lineHeight: 1.6,
                    fontSize: '0.95rem',
                  }}
                >
                  {course.description}
                </p>

                <div
                  style={{
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '14px',
                    color: '#4b5563',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                  }}
                >
                  {course.noteCount}
                </div>
              </article>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}