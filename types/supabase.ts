export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
        }
      }
      shifts: {
        Row: {
          created_at: string | null
          id: string
          odometer_end: number
          odometer_start: number
          revenue: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          odometer_end?: number
          odometer_start?: number
          revenue?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          odometer_end?: number
          odometer_start?: number
          revenue?: number | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
