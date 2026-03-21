import { apiClient } from '../lib/apiClient'
import type { NoteRequest, NoteRequestInput } from '../types/models'

const REQUESTS_ENDPOINT = '/requests'

export const requestsService = {
  // TEAM TODO (Backend): Connect this endpoint to your real requests table/API.
  list() {
    return apiClient<NoteRequest[]>(REQUESTS_ENDPOINT)
  },
  // TEAM TODO (Backend): Confirm ID format and route with database implementation.
  getById(requestId: string) {
    return apiClient<NoteRequest>(`${REQUESTS_ENDPOINT}/${requestId}`)
  },
  // TEAM TODO (Backend): Add validation/auth handling once create-request API is live.
  create(payload: NoteRequestInput) {
    return apiClient<NoteRequest>(REQUESTS_ENDPOINT, {
      method: 'POST',
      body: payload,
    })
  },
}
