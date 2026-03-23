import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

type PageTemplateProps = {
  name: string
  subtitle?: string
  children?: ReactNode
}

type SidebarItem = {
  label: string
  path: string
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', path: '/' },
  { label: 'Class Filter', path: '/classes' },
  { label: 'Course Filter', path: '/courses' },
  { label: 'Topic Tags', path: '/notes' },
  { label: 'Sort', path: '/requests' },
]

function getActiveSidebarLabel(pathname: string) {
  if (pathname === '/') return 'Dashboard'
  if (pathname.startsWith('/classes')) return 'Class Filter'
  if (pathname.startsWith('/courses')) return 'Course Filter'
  if (pathname.startsWith('/notes')) return 'Topic Tags'
  if (pathname.startsWith('/requests')) return 'Sort'
  return 'Dashboard'
}

export function PageTemplate({ name, subtitle, children }: PageTemplateProps) {
  const location = useLocation()
  const activeLabel = getActiveSidebarLabel(location.pathname)

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

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sidebarItems.map((item) => {
            const isActive = item.label === activeLabel

            return (
              <Link
                key={item.label}
                to={item.path}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: isActive ? '1px solid #323436' : '1px solid transparent',
                  backgroundColor: isActive ? '#eae9e9' : 'transparent',
                  color: '#000000',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <main
        className="page-template"
        aria-label={`${name} page template`}
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
            padding: '30px 32px',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              margin: 0,
              color: '#737882',
              fontSize: '0.9rem',
              fontWeight: 700,
            }}
          >
            {activeLabel}
          </p>

          <h1
            style={{
              margin: '8px 0 10px 0',
              fontSize: '2.4rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            {name}
          </h1>

          {subtitle ? (
            <p
              style={{
                margin: 0,
                color: '#6b7280',
                fontSize: '0.98rem',
                lineHeight: 1.6,
                maxWidth: '680px',
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </section>

        <section>{children}</section>
      </main>
    </div>
  )
}
