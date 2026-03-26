import { Link } from 'react-router-dom'

export function NoteDetailsPage() {

  const classItems = ['SEG3125', 'CSI2101', 'SEG2105']
  const courseItems = ['User Interface', 'Data Structures', 'Discrete Structures']
  const topicTags = ['#sorting', '#algorithms', '#linear algebra']

  const comments = [
    {
      user: 'Username',
      text: 'Comments are displayed here...',
      time: '4h ago',
    },
    {
      user: 'Username',
      text: 'Other users can be tagged with @user',
      time: '2h ago',
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
          to="/classes"
          style={{
            display: 'inline-block',
            marginBottom: '20px',
            fontSize: '0.9rem',
            color: '#050505',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          ← Back to Class Notes
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
            {courseItems.map((item) => (
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
          <h1
            style={{
              margin: '8px 0 10px 0',
              fontSize: '2.4rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            NOTE TITLE
          </h1>

          <p
            style={{
              margin: '0 0 10px 0',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#111827',
            }}
          >
            By: Username
          </p>

          
        </section>

        <section
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '28px',
            minHeight: '260px',
          }}
        >
          <p
            style={{
              margin: 0,
              lineHeight: 1.7,
              color: '#374151',
              fontSize: '0.98rem',
            }}
          >
            Notes will be displayed here.......
          </p>
        </section>

        <section
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '28px',
          }}
        >
          <h2
            style={{
              margin: '0 0 14px 0',
              fontSize: '1.5rem',
              fontWeight: 700,
            }}
          >
            Ratings
          </h2>

          <div
            style={{
              fontSize: '2.4rem',
              letterSpacing: '6px',
            }}
          >
            ★★★☆☆
          </div>
        </section>

        <section
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            padding: '24px',
          }}
        >
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '1.5rem',
              fontWeight: 700,
            }}
          >
            Comments
          </h2>

          <div
            style={{
              borderTop: '1px solid #e5e7eb',
              paddingTop: '18px',
              marginBottom: '22px',
            }}
          >
            {comments.map((comment, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      backgroundColor: '#e5e7eb',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: '4px',
                      }}
                    >
                      {comment.user}
                    </div>
                    <div
                      style={{
                        color: '#4b5563',
                        lineHeight: 1.5,
                      }}
                    >
                      {comment.text}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#6b7280',
                    fontSize: '0.95rem',
                  }}
                >
                  {comment.time}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Add a comment here..."
              style={{
                flex: 1,
                minWidth: '220px',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                outline: 'none',
              }}
            />

            <button
              style={{
                padding: '14px 20px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: '#111827',
                color: '#ffffff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}