import { apiClient } from '@/utils/api'
import type { ApiResponse } from '@/types'

export interface CVAnalysisRequest {
  name: string
  position: string
  email: string
  phone?: string
  location?: string
  experience?: string
}

export interface CVAnalysisResponse {
  id: number
  name: string
  position: string
  email: string
  phone?: string
  location?: string
  experience?: string
  skills: string[]
  match_score?: number
  match_level?: string
  created_at: string
  updated_at: string
}

export interface CVUploadResponse {
  message: string
  cv: CVAnalysisResponse
}

export const cvService = {
  // Get all CVs
  async getCVs(skip = 0, limit = 100) {
    return apiClient.get<CVAnalysisResponse[]>('/cvs', { skip, limit })
  },

  // Analyze CV data
  async analyzeCV(data: CVAnalysisRequest) {
    return apiClient.post<CVAnalysisResponse>('/cvs/analyze', data)
  },

  // Upload CV file
  async uploadCV(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    
    return apiClient.post<CVUploadResponse>('/cvs/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
