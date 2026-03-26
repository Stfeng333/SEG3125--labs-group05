import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { requestsService } from '../services'
import type { NoteRequest } from '../types/models'
import { PageTemplate } from './PageTemplate'

export function RequestsPage() {
  const [requests, setRequests] = useState<NoteRequest[]>([])

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'answered' | 'closed'>('all')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function loadRequests() {
      try {
        setLoading(true)
        setErrorMessage(null)
        const response = await requestsService.list()
        setRequests(response)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load requests.')
      } finally {
        setLoading(false)
      }
    }

    void loadRequests()
  }, [])

  async function handleSubmit() {
    if (!title.trim() || !details.trim()) return

    try {
      setSubmitting(true)
      setErrorMessage(null)

      const created = await requestsService.create({
        title,
        details,
        tags: [],
      })

      setRequests((current) => [created, ...current])
      setTitle('')
      setDetails('')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to create request.')
    } finally {
      setSubmitting(false)
    }
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
          disabled={submitting}
          style={{
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid #323436',
            backgroundColor: submitting ? '#f3f4f6' : '#eae9e9',
            color: '#111827',
            fontWeight: 600,
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </section>

      {errorMessage ? (
        <section
          style={{
            marginBottom: '16px',
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

      <section style={{ marginBottom: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {(['all', 'open', 'answered', 'closed'] as const).map((option) => {
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
            Loading requests...
          </article>
        ) : null}

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

      {!loading && visibleRequests.length === 0 ? (
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
