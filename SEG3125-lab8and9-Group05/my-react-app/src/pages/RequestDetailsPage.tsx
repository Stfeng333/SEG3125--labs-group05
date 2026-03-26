import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { requestsService } from '../services'
import type { NoteRequest, RequestReply } from '../types/models'
import { PageTemplate } from './PageTemplate'

export function RequestDetailsPage() {
  const { requestId } = useParams()

  const [request, setRequest] = useState<NoteRequest | null>(null)
  const [replies, setReplies] = useState<RequestReply[]>([])
  const [newReply, setNewReply] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!requestId) {
      setLoading(false)
      setErrorMessage('Invalid request ID.')
      return
    }

    const currentRequestId = requestId

    async function loadDetails() {
      try {
        setLoading(true)
        setErrorMessage(null)

        const [requestResponse, repliesResponse] = await Promise.all([
          requestsService.getById(currentRequestId),
          requestsService.getReplies(currentRequestId),
        ])

        setRequest(requestResponse)
        setReplies(repliesResponse)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load request details.')
      } finally {
        setLoading(false)
      }
    }

    void loadDetails()
  }, [requestId])

  async function addReply() {
    if (!newReply.trim() || !requestId) return

    try {
      setSubmitting(true)
      setErrorMessage(null)
      await requestsService.addReply(requestId, { body: newReply })
      const updatedReplies = await requestsService.getReplies(requestId)
      setReplies(updatedReplies)
      setNewReply('')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to add reply.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageTemplate
      name="Request Details"
      subtitle="Follow the discussion, review existing replies, and contribute your answer."
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
        <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '0.92rem' }}>
          Request ID: {requestId}
        </p>

        {loading ? <p style={{ margin: '0 0 8px 0', color: '#6b7280' }}>Loading request details...</p> : null}

        {errorMessage ? <p style={{ margin: '0 0 8px 0', color: '#b91c1c' }}>{errorMessage}</p> : null}

        {!loading && request ? (
          <p style={{ margin: '0 0 8px 0', color: '#374151', lineHeight: 1.6 }}>{request.details}</p>
        ) : null}

        {!loading && request ? (
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.92rem' }}>
            Status: {request.status || 'open'}
          </p>
        ) : null}
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
        <h3 style={{ margin: '0 0 14px 0', fontSize: '1.2rem' }}>Replies</h3>

        {replies.map((reply) => (
          <div
            key={reply.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px 14px',
              marginBottom: '10px',
              color: '#374151',
              lineHeight: 1.55,
              backgroundColor: '#fafafa',
            }}
          >
            <div style={{ marginBottom: '4px', color: '#111827', fontWeight: 600 }}>
              {reply.author?.displayName || 'Anonymous'}
            </div>
            <div>{reply.body}</div>
          </div>
        ))}

        {!loading && !errorMessage && replies.length === 0 ? (
          <p style={{ margin: 0, color: '#6b7280' }}>No replies yet. Be the first to answer.</p>
        ) : null}
      </section>

      <section
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '20px',
          padding: '20px',
        }}
      >
        <h3 style={{ margin: '0 0 14px 0', fontSize: '1.2rem' }}>Add Reply</h3>

        <textarea
          placeholder="Write reply..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            minHeight: '120px',
            marginBottom: '10px',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1px solid #d1d5db',
            backgroundColor: '#f9fafb',
            outline: 'none',
            resize: 'vertical',
          }}
        />

        <button
          onClick={addReply}
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
          {submitting ? 'Adding...' : 'Add Reply'}
        </button>
      </section>
    </PageTemplate>
  )
}