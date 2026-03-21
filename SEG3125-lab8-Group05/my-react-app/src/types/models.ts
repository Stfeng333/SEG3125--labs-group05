export interface AuthorSummary {
  id: string
  displayName: string
}

export interface Note {
  id: string
  title: string
  preview: string
  content?: string
  tags: string[]
  classId?: string
  courseId?: string
  author: AuthorSummary
  rating?: number
  commentsCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface NoteInput {
  title: string
  content: string
  tags: string[]
  classId?: string
  courseId?: string
}

export interface NoteRequest {
  id: string
  title: string
  details: string
  tags: string[]
  classId?: string
  courseId?: string
  createdBy: AuthorSummary
  createdAt?: string
  status?: 'open' | 'answered' | 'closed'
}

export interface NoteRequestInput {
  title: string
  details: string
  tags: string[]
  classId?: string
  courseId?: string
}

export interface ClassCommunity {
  id: string
  code: string
  name: string
}

export interface CourseCommunity {
  id: string
  code: string
  name: string
  classId?: string
}
