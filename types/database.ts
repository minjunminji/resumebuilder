export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_id: string
          onboarding_complete: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          onboarding_complete?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          onboarding_complete?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blobs: {
        Row: {
          id: string
          user_id: string
          category: 'work_experience' | 'volunteering' | 'project' | 'school' | 'award' | 'skill_blob'
          title: string
          description: string
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: 'work_experience' | 'volunteering' | 'project' | 'school' | 'award' | 'skill_blob'
          title: string
          description: string
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: 'work_experience' | 'volunteering' | 'project' | 'school' | 'award' | 'skill_blob'
          title?: string
          description?: string
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          user_id: string
          name: string
          level: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          level?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          level?: string | null
          created_at?: string
        }
      }
      bullet_versions: {
        Row: {
          id: string
          user_id: string
          blob_id: string
          text: string
          job_context: string | null
          rating: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          blob_id: string
          text: string
          job_context?: string | null
          rating?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          blob_id?: string
          text?: string
          job_context?: string | null
          rating?: number | null
          created_at?: string
        }
      }
      job_descriptions: {
        Row: {
          id: string
          user_id: string
          title: string | null
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          description?: string
          created_at?: string
        }
      }
      generated_resumes: {
        Row: {
          id: string
          user_id: string
          job_description_id: string | null
          selected_blob_ids: string[]
          pinned_blob_ids: string[]
          excluded_blob_ids: string[]
          model_provider: string | null
          model_name: string | null
          final_pdf_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_description_id?: string | null
          selected_blob_ids?: string[]
          pinned_blob_ids?: string[]
          excluded_blob_ids?: string[]
          model_provider?: string | null
          model_name?: string | null
          final_pdf_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_description_id?: string | null
          selected_blob_ids?: string[]
          pinned_blob_ids?: string[]
          excluded_blob_ids?: string[]
          model_provider?: string | null
          model_name?: string | null
          final_pdf_url?: string | null
          created_at?: string
        }
      }
    }
  }
}
