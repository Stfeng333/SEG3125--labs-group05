import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { notesService } from '../services'
import type { Note, NoteComment } from '../types/models'
import { PageTemplate } from './PageTemplate'

export function NoteDetailsPage() {
  const { noteId } = useParams()
  const [note, setNote] = useState<Note | null>(null)
  const [comments, setComments] = useState<NoteComment[]>([])
  const [newComment, setNewComment] = useState('')
  const [ratingValue, setRatingValue] = useState(5)
  const [loading, setLoading] = useState(true)
  const [submittingComment, setSubmittingComment] = useState(false)
  const [submittingRating, setSubmittingRating] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!noteId) {
      setLoading(false)
      setErrorMessage('Invalid note ID.')
      return
    }
    const currentNoteId = noteId

    async function loadData() {
      try {
        setLoading(true)
        setErrorMessage(null)
        const [noteResponse, commentsResponse] = await Promise.all([
          notesService.getById(currentNoteId),
          notesService.getComments(currentNoteId),
        ])
        setNote(noteResponse)
        setComments(commentsResponse)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load note details.')
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [noteId])

  async function handleAddComment() {
    if (!noteId || !newComment.trim()) return
    try {
      setSubmittingComment(true)
      await notesService.addComment(noteId, { body: newComment })
      const updatedComments = await notesService.getComments(noteId)
      const updatedNote = await notesService.getById(noteId)
      setComments(updatedComments)
      setNote(updatedNote)
      setNewComment('')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to add comment.')
    } finally {
      setSubmittingComment(false)
    }
  }

  async function handleRateNote() {
    if (!noteId) return
    try {
      setSubmittingRating(true)
      const updated = await notesService.rate(noteId, { rating: ratingValue })
      setNote(updated)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit rating.')
    } finally {
      setSubmittingRating(false)
    }
  }

  return (
    <PageTemplate name={note?.title || 'Note Details'} subtitle="Read the full note, rate it, and join the discussion.">
      {errorMessage ? (
        <section
          style={{
            marginBottom: '20px',
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

      <section
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '28px',
        }}
      >
        {loading ? <p style={{ margin: 0, color: '#6b7280' }}>Loading note...</p> : null}
        {!loading && note ? (
          <>
            <h1 style={{ margin: '8px 0 10px 0', fontSize: '2.1rem', fontWeight: 700 }}>{note.title}</h1>
            <p style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
              By: {note.author.displayName}
            </p>
            <p style={{ margin: 0, lineHeight: 1.7, color: '#374151', fontSize: '0.98rem' }}>
              {note.content || note.preview}
            </p>
          </>
        ) : null}
      </section>

      <section
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '28px',
        }}
      >
        <h2 style={{ margin: '0 0 14px 0', fontSize: '1.5rem', fontWeight: 700 }}>Rating</h2>
        <p style={{ margin: '0 0 12px 0', color: '#4b5563' }}>
          Current average: {Number(note?.rating || 0).toFixed(1)} / 5
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <select
            value={ratingValue}
            onChange={(event) => setRatingValue(Number(event.target.value))}
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              backgroundColor: '#f9fafb',
            }}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <button
            onClick={handleRateNote}
            disabled={submittingRating}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid #323436',
              backgroundColor: submittingRating ? '#f3f4f6' : '#eae9e9',
              color: '#111827',
              fontWeight: 600,
              cursor: submittingRating ? 'not-allowed' : 'pointer',
            }}
          >
            {submittingRating ? 'Submitting...' : 'Submit Rating'}
          </button>
        </div>
      </section>

      <section
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '20px',
          padding: '24px',
        }}
      >
        <h2 style={{ margin: '0 0 16px 0', fontSize: '1.5rem', fontWeight: 700 }}>Comments</h2>

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '18px', marginBottom: '22px' }}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px 14px', marginBottom: '12px' }}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>{comment.author?.displayName || 'Anonymous'}</div>
              <div style={{ color: '#4b5563', lineHeight: 1.5 }}>{comment.body}</div>
            </div>
          ))}

          {!loading && comments.length === 0 ? (
            <p style={{ margin: 0, color: '#6b7280' }}>No comments yet. Start the discussion.</p>
          ) : null}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            placeholder="Add a comment here..."
            style={{
              flex: 1,
              minWidth: '220px',
              padding: '14px 16px',
              borderRadius: '14px',
              border: '1px solid #d1d5db',
              backgroundColor: '#ffffff',
              outline: 'none',
            }}
          />

          <button
            onClick={handleAddComment}
            disabled={submittingComment}
            style={{
              padding: '14px 20px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: submittingComment ? '#9ca3af' : '#111827',
              color: '#ffffff',
              fontWeight: 600,
              cursor: submittingComment ? 'not-allowed' : 'pointer',
            }}
          >
            {submittingComment ? 'Sending...' : 'Send'}
          </button>
        </div>
      </section>
    </PageTemplate>
  )
}