import { apiClient } from '../lib/apiClient'
import type {
  Note,
  NoteComment,
  NoteCommentInput,
  NoteInput,
  NoteRatingInput,
} from '../types/models'

const NOTES_ENDPOINT = '/notes'

export const notesService = {
  list(filters?: { classId?: string; courseId?: string; q?: string }) {
    if (!filters) {
      return apiClient<Note[]>(NOTES_ENDPOINT)
    }

    const params = new URLSearchParams()
    if (filters.classId) params.set('classId', filters.classId)
    if (filters.courseId) params.set('courseId', filters.courseId)
    if (filters.q) params.set('q', filters.q)
    const suffix = params.toString()

    return apiClient<Note[]>(suffix ? `${NOTES_ENDPOINT}?${suffix}` : NOTES_ENDPOINT)
  },
  getById(noteId: string) {
    return apiClient<Note>(`${NOTES_ENDPOINT}/${noteId}`)
  },
  create(payload: NoteInput) {
    return apiClient<Note>(NOTES_ENDPOINT, {
      method: 'POST',
      body: payload,
    })
  },
  getComments(noteId: string) {
    return apiClient<NoteComment[]>(`${NOTES_ENDPOINT}/${noteId}/comments`)
  },
  addComment(noteId: string, payload: NoteCommentInput) {
    return apiClient<NoteComment>(`${NOTES_ENDPOINT}/${noteId}/comments`, {
      method: 'POST',
      body: payload,
    })
  },
  rate(noteId: string, payload: NoteRatingInput) {
    return apiClient<Note>(`${NOTES_ENDPOINT}/${noteId}/ratings`, {
      method: 'POST',
      body: payload,
    })
  },
}
