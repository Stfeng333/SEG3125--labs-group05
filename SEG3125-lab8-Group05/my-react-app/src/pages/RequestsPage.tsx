import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageTemplate } from './PageTemplate'

export function RequestsPage() {
  const [requests, setRequests] = useState([
    {
      id: '1',
      title: 'Need CSI2101 notes',
      details: 'Missed lecture 3 and need help catching up.',
      status: 'open',
    },
    {
      id: '2',
      title: 'Looking for SEG3125 heuristic evaluation notes',
      details: 'Especially the examples from class.',
      status: 'answered',
    },
  ])

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'answered'>('all')

  function handleSubmit() {
    if (!title.trim() || !details.trim()) return

    const newRequest = {
      id: Date.now().toString(),
      title,
      details,
      status: 'open',
    }

    setRequests([newRequest, ...requests])
    setTitle('')
    setDetails('')
  }

  const visibleRequests = useMemo(() => {
    if (statusFilter === 'all') return requests
    return requests.filter((request) => request.status === statusFilter)
  }, [requests, statusFilter])

  return (
    <PageTemplate
      name="Sort"
      subtitle="Create requests and sort by status to find unanswered discussions quickly."
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
        <h2 style={{ margin: '0 0 14px 0', fontSize: '1.3rem' }}>Create Request</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '0.7rem',
            width: '100%',
            maxWidth: '620px',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1px solid #d1d5db',
            backgroundColor: '#f9fafb',
            outline: 'none',
          }}
        />

        <textarea
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          style={{
            display: 'block',
            marginBottom: '0.8rem',
            width: '100%',
            maxWidth: '620px',
            minHeight: '120px',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1px solid #d1d5db',
            backgroundColor: '#f9fafb',
            outline: 'none',
            resize: 'vertical',
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid #323436',
            backgroundColor: '#eae9e9',
            color: '#111827',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </section>

      <section style={{ marginBottom: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {(['all', 'open', 'answered'] as const).map((option) => {
          const selected = option === statusFilter
          return (
            <button
              key={option}
              onClick={() => setStatusFilter(option)}
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
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          )
        })}
      </section>

      <section style={{ display: 'grid', gap: '16px' }}>
        {visibleRequests.map((req) => (
          <article
            key={req.id}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>{req.title}</h3>

            <p
              style={{
                margin: '0 0 12px 0',
                color: '#4b5563',
                lineHeight: 1.6,
              }}
            >
              {req.details}
            </p>

            <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '0.92rem' }}>
              Status: <strong style={{ color: '#111827' }}>{req.status}</strong>
            </p>

            <Link
              to={`/requests/${req.id}`}
              style={{
                color: '#111827',
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: '1px solid #111827',
                paddingBottom: '1px',
              }}
            >
              View request
            </Link>
          </article>
        ))}
      </section>

      {visibleRequests.length === 0 ? (
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
          No requests found for this filter.
        </section>
      ) : null}
    </PageTemplate>
  )
}
