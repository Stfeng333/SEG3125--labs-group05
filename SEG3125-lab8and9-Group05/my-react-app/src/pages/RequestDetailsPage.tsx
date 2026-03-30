import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { requestsService } from '../services'
import type { NoteRequest, RequestReply } from '../types/models'
import { PageTemplate } from './PageTemplate'

export function RequestDetailsPage() {
  const { t } = useTranslation()
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
      setErrorMessage(t('requestDetails.errors.invalidId'))
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
        setErrorMessage(error instanceof Error ? error.message : t('requestDetails.errors.loadRequest'))
      } finally {
        setLoading(false)
      }
    }

    void loadDetails()
  }, [requestId, t])

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
      setErrorMessage(error instanceof Error ? error.message : t('requestDetails.errors.addReply'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageTemplate
      name={t('requestDetails.title')}
      subtitle={t('requestDetails.subtitle')}
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
          {t('requestDetails.requestId')} {requestId}
        </p>

        {loading ? (
          <p style={{ margin: '0 0 8px 0', color: '#6b7280' }}>
            {t('requestDetails.loading')}
          </p>
        ) : null}

        {errorMessage ? (
          <p style={{ margin: '0 0 8px 0', color: '#b91c1c' }}>
            {errorMessage}
          </p>
        ) : null}

        {!loading && request ? (
          <p style={{ margin: '0 0 8px 0', color: '#374151', lineHeight: 1.6 }}>
            {request.details}
          </p>
        ) : null}

        {!loading && request ? (
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.92rem' }}>
            {t('requestDetails.status')} {request.status || t('requestDetails.open')}
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
        <h3 style={{ margin: '0 0 14px 0', fontSize: '1.2rem' }}>
          {t('requestDetails.replies')}
        </h3>

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
              {reply.author?.displayName || t('requestDetails.anonymous')}
            </div>
            <div>{reply.body}</div>
          </div>
        ))}

        {!loading && !errorMessage && replies.length === 0 ? (
          <p style={{ margin: 0, color: '#6b7280' }}>
            {t('requestDetails.noReplies')}
          </p>
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
        <h3 style={{ margin: '0 0 14px 0', fontSize: '1.2rem' }}>
          {t('requestDetails.addReply')}
        </h3>

        <textarea
          placeholder={t('requestDetails.writeReply')}
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
          {submitting ? t('requestDetails.adding') : t('requestDetails.addReply')}
        </button>
      </section>
    </PageTemplate>
  )
}