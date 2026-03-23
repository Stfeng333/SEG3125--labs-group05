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
    <PageTemplate name="Request Details">
      <h2>Request ID: {requestId}</h2>
      <p>This is a placeholder request description for the selected request.</p>
      <p>Status: Open</p>

      <h3>Replies</h3>

      {replies.map((reply, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '0.75rem',
            marginBottom: '0.5rem',
          }}
        >
          {reply}
        </div>
      ))}

      <h3>Add Reply</h3>

      <textarea
        placeholder="Write reply..."
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        style={{ display: 'block', width: '100%', minHeight: '100px', marginBottom: '0.5rem' }}
      />

      <button onClick={addReply}>Add Reply</button>
    </PageTemplate>
  )
}