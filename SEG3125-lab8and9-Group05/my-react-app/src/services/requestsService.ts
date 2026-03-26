import { apiClient } from '../lib/apiClient'
import type { NoteRequest, NoteRequestInput, RequestReply, RequestReplyInput } from '../types/models'

const REQUESTS_ENDPOINT = '/requests'

export const requestsService = {
  list() {
    return apiClient<NoteRequest[]>(REQUESTS_ENDPOINT)
  },
  getById(requestId: string) {
    return apiClient<NoteRequest>(`${REQUESTS_ENDPOINT}/${requestId}`)
  },
  create(payload: NoteRequestInput) {
    return apiClient<NoteRequest>(REQUESTS_ENDPOINT, {
      method: 'POST',
      body: payload,
    })
  },
  getReplies(requestId: string) {
    return apiClient<RequestReply[]>(`${REQUESTS_ENDPOINT}/${requestId}/replies`)
  },
  addReply(requestId: string, payload: RequestReplyInput) {
    return apiClient<RequestReply>(`${REQUESTS_ENDPOINT}/${requestId}/replies`, {
      method: 'POST',
      body: payload,
    })
  },
}
