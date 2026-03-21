import { apiClient } from '../lib/apiClient'
import type { Note, NoteInput } from '../types/models'

const NOTES_ENDPOINT = '/notes'

export const notesService = {
  // TEAM TODO (Backend): Connect this endpoint to your real notes table/API.
  list() {
    return apiClient<Note[]>(NOTES_ENDPOINT)
  },
  // TEAM TODO (Backend): Confirm ID format and route with database implementation.
  getById(noteId: string) {
    return apiClient<Note>(`${NOTES_ENDPOINT}/${noteId}`)
  },
  // TEAM TODO (Backend): Add validation/auth handling once create-note API is live.
  create(payload: NoteInput) {
    return apiClient<Note>(NOTES_ENDPOINT, {
      method: 'POST',
      body: payload,
    })
  },
}
