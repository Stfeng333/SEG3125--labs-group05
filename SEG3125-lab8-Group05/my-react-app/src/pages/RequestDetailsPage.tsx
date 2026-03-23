import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageTemplate } from './PageTemplate'

export function RequestDetailsPage() {
  const { requestId } = useParams()

  const [replies, setReplies] = useState<string[]>([
    'I have these notes and can send them later today.',
    'I only have partial notes, but they might still help.',
  ])
  const [newReply, setNewReply] = useState('')

  function addReply() {
    if (!newReply.trim()) return
    setReplies([...replies, newReply])
    setNewReply('')
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

        <p style={{ margin: '0 0 8px 0', color: '#374151', lineHeight: 1.6 }}>
          This is a placeholder request description for the selected request.
        </p>

        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.92rem' }}>Status: Open</p>
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

        {replies.map((reply, index) => (
          <div
            key={index}
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
            {reply}
          </div>
        ))}
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
          Add Reply
        </button>
      </section>
    </PageTemplate>
  )
}