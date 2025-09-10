import { apiClient } from '@/utils/api'
import type { ApiResponse } from '@/types'

export interface DashboardStats {
  total_cvs: number
  suitable_candidates: number
  active_jobs: number
  average_match_rate: number
}

export interface ActivityItem {
  name: string
  title: string
  match: string
  time: string
  status: string
}

export const dashboardService = {
  // Get dashboard statistics
  async getStats() {
    return apiClient.get<DashboardStats>('/dashboard/stats')
  },

  // Get recent activity
  async getRecentActivity() {
    return apiClient.get<ActivityItem[]>('/recent-activity')
  }
}
