import { Link } from 'react-router-dom'

export function HomePage() {
  const notes = [
    {
      id: '1',
      title: 'Understanding JavaScript Promises',
      description:
        'Dive into asynchronous programming and learn how promises work in real development scenarios.',
      tags: ['JavaScript', 'Asynchronous'],
      author: 'User1',
    },
    {
      id: '2',
      title: 'CSS Grid Layout',
      description:
        'A practical guide to building structured and responsive page layouts with CSS Grid.',
      tags: ['CSS', 'Layout'],
      author: 'User2',
    },
    {
      id: '3',
      title: 'Explore React Hooks',
      description:
        'Understand state management and side effects in modern functional components.',
      tags: ['React', 'Frontend'],
      author: 'User3',
    },
    {
      id: '4',
      title: 'Mastering Python Decorators',
      description:
        'A deeper look into decorators and how they improve readability and reuse in Python.',
      tags: ['Python', 'Advanced'],
      author: 'User4',
    },
  ]

  const sidebarItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Classes', path: '/classes' },
    { label: 'Courses', path: '/courses' },
    { label: 'Topic Tags', path: '/notes' },
    { label: 'Sort', path: '/requests' },
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
          <p
            style={{
              marginTop: '8px',
              fontSize: '0.9rem',
              color: '#6b7280',
            }}
          >
           
          </p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sidebarItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              style={{
                textAlign: 'left',
                padding: '12px 14px',
                borderRadius: '12px',
                border: index === 0 ? '1px solid #323436' : '1px solid transparent',
                backgroundColor: index === 0 ? '#eae9e9' : 'transparent',
                color: index === 0 ? '#000000' : '#000000',
                fontSize: '0.95rem',
                fontWeight: 500,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: '40px 48px',
        }}
      >
        <section
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '24px',
            padding: '36px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#737882',
                fontSize: '0.9rem',
                fontWeight: 800,
              }}
            >
              Dashboard
            </p>

            <h1
              style={{
                margin: '10px 0 12px 0',
                fontSize: '2.4rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
              }}
            >
              Explore Notes
            </h1>

            <p
              style={{
                margin: '0 auto 24px auto',
                color: '#6b7280',
                fontSize: '1rem',
                lineHeight: 1.6,
                maxWidth: '560px',
              }}
            >
              Discover helpful notes, browse by subject, and stay organized.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <input
                type="text"
                placeholder="Search notes, classes, or topics"
                style={{
                  width: '100%',
                  maxWidth: '460px',
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

        <section style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                Featured Notes
              </h2>
              <p
                style={{
                  margin: '6px 0 0 0',
                  color: '#6b7280',
                  fontSize: '0.95rem',
                }}
              >
                Explore a variety of available notes.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Most Recent', 'Top Rated', 'Programming', 'Design'].map((filter) => (
                <button
                  key={filter}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '999px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    fontSize: '0.88rem',
                    color: '#374151',
                    cursor: 'pointer',
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '18px',
            }}
          >
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
                    padding: '18px',
                    display: 'flex',
                    gap: '16px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '16px',
                      backgroundColor: '#eef2f7',
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: '0 0 8px 0',
                        fontSize: '1rem',
                        fontWeight: 700,
                      }}
                    >
                      {note.title}
                    </h3>

                    <p
                      style={{
                        margin: '0 0 12px 0',
                        fontSize: '0.9rem',
                        lineHeight: 1.55,
                        color: '#6b7280',
                      }}
                    >
                      {note.description}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        marginBottom: '12px',
                      }}
                    >
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

                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.82rem',
                        color: '#4b5563',
                        fontWeight: 500,
                      }}
                    >
                      {note.author}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '24px',
              padding: '28px',
            }}
          >
            <h2
              style={{
                margin: '0 0 18px 0',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              Note Cards
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                padding: '20px',
                borderRadius: '18px',
                backgroundColor: '#f9fafb',
                border: '1px solid #eef0f3',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#e5e7eb',
                  flexShrink: 0,
                }}
              />

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: '0 0 6px 0',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                  }}
                >
                  User Name
                </h3>

                <p
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '0.82rem',
                    color: '#6b7280',
                  }}
                >
                  Beginner · Active Learner
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: '0.92rem',
                    color: '#374151',
                  }}
                >
                  Welcome to your learning dashboard.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                style={{
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                View Activities
              </button>

              <Link
                to="/courses/"
                style={{
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Update Profile
              </Link>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '24px',
              padding: '28px',
            }}
          >
            <h2
              style={{
                margin: '0 0 18px 0',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              Request Notes
            </h2>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '0.84rem',
                    color: '#374151',
                    fontWeight: 600,
                  }}
                >
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter note title"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#f9fafb',
                    fontSize: '0.92rem',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '0.84rem',
                    color: '#374151',
                    fontWeight: 600,
                  }}
                >
                  Details
                </label>
                <textarea
                  placeholder="Specify your request details"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#f9fafb',
                    fontSize: '0.92rem',
                    resize: 'none',
                  }}
                />
              </div>

              <Link
                to="/requests"
                style={{
                  marginTop: '4px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block',
                  width: 'fit-content',
                }}
              >
                Submit Request
              </Link>
            </form>
          </div>
        </section>

        <section
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '24px',
            padding: '28px',
            marginBottom: '28px',
          }}
        >
          <h2
            style={{
              margin: '0 0 10px 0',
              fontSize: '1.5rem',
              fontWeight: 700,
            }}
          >
            Empty Result State
          </h2>

          <p
            style={{
              margin: '0 0 24px 0',
              color: '#6b7280',
              fontSize: '0.95rem',
            }}
          >
            No notes found.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            <div
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '22px',
                backgroundColor: '#f9fafb',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#fee2e2',
                  marginBottom: '14px',
                }}
              />
              <h3
                style={{
                  margin: '0 0 6px 0',
                  fontSize: '1rem',
                }}
              >
                Try broader tags
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.88rem',
                  color: '#6b7280',
                  lineHeight: 1.5,
                }}
              >
                Expand your search terms to explore more available notes.
              </p>
            </div>

            <Link
              to="/requests"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '18px',
                  padding: '22px',
                  backgroundColor: '#f9fafb',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#dbeafe',
                    marginBottom: '14px',
                  }}
                />
                <h3
                  style={{
                    margin: '0 0 6px 0',
                    fontSize: '1rem',
                  }}
                >
                  Create request
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.88rem',
                    color: '#6b7280',
                    lineHeight: 1.5,
                  }}
                >
                  Let other users know what notes you are currently looking for.
                </p>
              </div>
            </Link>
          </div>
        </section>

        <footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            color: '#6b7280',
            fontSize: '0.88rem',
            paddingBottom: '8px',
          }}
        >
          <div>© 2026 Notehub</div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <p> Website designed by Salma Ahmed, Steven Feng Peng, and Sahara Sammy ☆ </p>
        </footer>
      </main>
    </div>
  )
}