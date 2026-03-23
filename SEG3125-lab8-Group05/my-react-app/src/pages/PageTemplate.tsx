import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type PageTemplateProps = {
  name: string
  children?: ReactNode
}

export function PageTemplate({ name, children }: PageTemplateProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '220px', background: '#f5f5f5', padding: '1rem' }}>
        <h2>NoteHub</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/">Home</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/requests">Requests</Link>
          <Link to="/classes">Classes</Link>
          <Link to="/courses">Courses</Link>
        </nav>
      </aside>

      <main
        className="page-template"
        aria-label={`${name} page template`}
        style={{ flex: 1 }}
      >
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <h1>{name}</h1>
        </header>

        <section style={{ padding: '1rem' }}>{children}</section>
      </main>
    </div>
  )
}
