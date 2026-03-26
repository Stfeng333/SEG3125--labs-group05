import { apiClient } from '../lib/apiClient'
import type { ClassCommunity, CourseCommunity } from '../types/models'

export const communitiesService = {
  // TEAM TODO (Backend): Connect class communities query to your database API.
  listClasses() {
    return apiClient<ClassCommunity[]>('/classes')
  },
  // TEAM TODO (Backend): Connect course communities query to your database API.
  listCourses() {
    return apiClient<CourseCommunity[]>('/courses')
  },
  // TEAM TODO (Backend): Expand response shape when modules/paths are available.
  getCourseById(courseId: string) {
    return apiClient<CourseCommunity>(`/courses/${courseId}`)
  },
}
