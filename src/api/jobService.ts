import { apiClient } from '@/utils/api'
import type { ApiResponse } from '@/types'

export interface JobCreate {
  position: string
  department: string
  location: string
  description: string
  skills: string[]
  experience: string
  salary: string
}

export interface JobResponse {
  id: number
  position: string
  department: string
  location: string
  description: string
  skills: string[]
  experience: string
  salary: string
  status: string
  created_at: string
  updated_at: string
}

export interface CandidateResponse {
  id: number
  name: string
  position: string
  email: string
  phone?: string
  location?: string
  experience?: string
  skills: string[]
  match_score: number
  match_level: string
  job_id: number
  created_at: string
  updated_at: string
}

export const jobService = {
  // Get all jobs
  async getJobs(skip = 0, limit = 100) {
    return apiClient.get<JobResponse[]>('/jobs', { skip, limit })
  },

  // Create new job
  async createJob(jobData: JobCreate) {
    return apiClient.post<JobResponse>('/jobs', jobData)
  },

  // Update job
  async updateJob(jobId: number, jobData: Partial<JobCreate>) {
    return apiClient.put<JobResponse>(`/jobs/${jobId}`, jobData)
  },

  // Get job candidates
  async getJobCandidates(jobId: number) {
    return apiClient.get<CandidateResponse[]>(`/jobs/${jobId}/candidates`)
  },

  // Get all candidates
  async getCandidates(skip = 0, limit = 100) {
    return apiClient.get<CandidateResponse[]>('/candidates', { skip, limit })
  }
}
