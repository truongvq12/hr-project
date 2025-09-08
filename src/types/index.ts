// Global type definitions

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export interface ApiResponse<T = any> {
  data: T
  message: string
  success: boolean
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Component prop types
export interface BaseComponentProps {
  class?: string
  id?: string
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

export interface FormData {
  [key: string]: any
}
