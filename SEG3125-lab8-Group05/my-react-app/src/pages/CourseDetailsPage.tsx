import { Link } from 'react-router-dom'

export function CourseDetailsPage() {

  const classItems = ['SEG3125', 'CSI2101', 'SEG2105']
  const courseItems = ['User Interface', 'Data Structures', 'Discrete Structures']
  const topicTags = ['#sorting', '#algorithms', '#linear algebra']

  const notes = [
    {
      id: '1',
      title: 'Note Title',
      author: 'Username',
      preview: 'Note preview will be displayed here...',
      tags: ['#sorting'],
      rating: '3.5',
      comments: '10 comments',
    },
    {
      id: '2',
      title: 'Note Title',
      author: 'Username',
      preview: 'Note preview will be displayed here...',
      tags: ['#sorting', '#algorithms'],
      rating: '5',
      comments: '22 comments',
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
          to="/courses"
          style={{
            display: 'inline-block',
            marginBottom: '20px',
            fontSize: '0.9rem',
            color: '#0b0b0b',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          ← Back to Courses
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
                CSI 2101 - Discrete Structures
              </h1>

            </div>

            <div style={{ minWidth: '260px', flex: 1, maxWidth: '420px' }}>
              <input
                type="text"
                placeholder="Search notes, authors, or topics"
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

        <section style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['Topics', 'Author'].map((filter) => (
              <button
                key={filter}
                style={{
                  padding: '12px 18px',
                  borderRadius: '14px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  fontSize: '0.95rem',
                  color: '#374151',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gap: '20px' }}>
          {notes.map((note) => (
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
                  padding: '22px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}
              >
                <h2
                  style={{
                    margin: '0 0 6px 0',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {note.title}
                </h2>

                <p
                  style={{
                    margin: '0 0 12px 0',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#111827',
                  }}
                >
                  By: {note.author}
                </p>

                <div
                  style={{
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '14px',
                    marginBottom: '22px',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.98rem',
                      lineHeight: 1.6,
                      color: '#374151',
                    }}
                  >
                    {note.preview}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      flexWrap: 'wrap',
                    }}
                  >
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

                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: '#111827',
                      }}
                    >
                      ★ {note.rating}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.95rem',
                      color: '#4b5563',
                    }}
                  >
                    {note.comments}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}