import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageTemplate } from './PageTemplate'

type Request = {
  id: string
  title: string
  details: string
  status: string
}

export function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([
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

  function handleSubmit() {
    if (!title.trim() || !details.trim()) return

    const newRequest: Request = {
      id: Date.now().toString(),
      title,
      details,
      status: 'open',
    }

    setRequests([newRequest, ...requests])
    setTitle('')
    setDetails('')
  }

  return (
    <PageTemplate name="Requests">
      <h2>Create Request</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
        />

        <textarea
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%', minHeight: '100px' }}
        />

        <button onClick={handleSubmit}>Submit</button>
      </div>

      <hr />

      <h2>All Requests</h2>

      {requests.map((req) => (
        <article
          key={req.id}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        >
          <h3>{req.title}</h3>
          <p>{req.details}</p>
          <p>Status: {req.status}</p>
          <Link to={`/requests/${req.id}`}>View request</Link>
        </article>
      ))}
    </PageTemplate>
  )
}