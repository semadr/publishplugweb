export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      messages: {
        Row: {
          body: string
          created_at: string
          id: string
          project_id: string
          sender_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          project_id: string
          sender_id?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          project_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          assignee_id: string | null
          created_at: string
          id: string
          in_package: boolean
          price: number | null
          project_id: string
          quantity: number
          service_code: string
          status: Database["public"]["Enums"]["order_status"]
          tier: string | null
          unit_price: number | null
        }
        Insert: {
          assignee_id?: string | null
          created_at?: string
          id?: string
          in_package?: boolean
          price?: number | null
          project_id: string
          quantity?: number
          service_code: string
          status?: Database["public"]["Enums"]["order_status"]
          tier?: string | null
          unit_price?: number | null
        }
        Update: {
          assignee_id?: string | null
          created_at?: string
          id?: string
          in_package?: boolean
          price?: number | null
          project_id?: string
          quantity?: number
          service_code?: string
          status?: Database["public"]["Enums"]["order_status"]
          tier?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_service_code_fkey"
            columns: ["service_code"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["code"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          card_brand: string
          card_last4: string
          created_at: string
          currency: string
          id: string
          owner_id: string
          project_id: string
          reference: string
          status: string
          test_mode: boolean
        }
        Insert: {
          amount: number
          card_brand: string
          card_last4: string
          created_at?: string
          currency?: string
          id?: string
          owner_id: string
          project_id: string
          reference: string
          status?: string
          test_mode?: boolean
        }
        Update: {
          amount?: number
          card_brand?: string
          card_last4?: string
          created_at?: string
          currency?: string
          id?: string
          owner_id?: string
          project_id?: string
          reference?: string
          status?: string
          test_mode?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      project_files: {
        Row: {
          created_at: string
          id: string
          kind: string
          name: string
          project_id: string
          size_bytes: number | null
          storage_path: string
          uploaded_by: string
          version: number
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          name: string
          project_id: string
          size_bytes?: number | null
          storage_path: string
          uploaded_by?: string
          version?: number
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          name?: string
          project_id?: string
          size_bytes?: number | null
          storage_path?: string
          uploaded_by?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          ai_assisted: boolean
          audio_hours: number
          author_name: string | null
          binding: string
          created_at: string
          genre: string | null
          id: string
          language: string
          launch_date: string | null
          notes: string | null
          owner_id: string
          package: string | null
          package_tier: string
          page_count_est: number | null
          paper: string
          rights_confirmed: boolean
          source_type: Database["public"]["Enums"]["source_type"]
          stage: Database["public"]["Enums"]["project_stage"]
          subtitle: string | null
          title: string
          trim_size: string
          updated_at: string
          word_count: number
        }
        Insert: {
          ai_assisted?: boolean
          audio_hours?: number
          author_name?: string | null
          binding?: string
          created_at?: string
          genre?: string | null
          id?: string
          language?: string
          launch_date?: string | null
          notes?: string | null
          owner_id?: string
          package?: string | null
          package_tier?: string
          page_count_est?: number | null
          paper?: string
          rights_confirmed?: boolean
          source_type?: Database["public"]["Enums"]["source_type"]
          stage?: Database["public"]["Enums"]["project_stage"]
          subtitle?: string | null
          title: string
          trim_size?: string
          updated_at?: string
          word_count?: number
        }
        Update: {
          ai_assisted?: boolean
          audio_hours?: number
          author_name?: string | null
          binding?: string
          created_at?: string
          genre?: string | null
          id?: string
          language?: string
          launch_date?: string | null
          notes?: string | null
          owner_id?: string
          package?: string | null
          package_tier?: string
          page_count_est?: number | null
          paper?: string
          rights_confirmed?: boolean
          source_type?: Database["public"]["Enums"]["source_type"]
          stage?: Database["public"]["Enums"]["project_stage"]
          subtitle?: string | null
          title?: string
          trim_size?: string
          updated_at?: string
          word_count?: number
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          base_price: number | null
          code: string
          description: string | null
          module: string
          name: string
          premium_price: number | null
          price_note: string | null
          pricing_type: Database["public"]["Enums"]["pricing_type"]
          sort_order: number
        }
        Insert: {
          active?: boolean
          base_price?: number | null
          code: string
          description?: string | null
          module: string
          name: string
          premium_price?: number | null
          price_note?: string | null
          pricing_type: Database["public"]["Enums"]["pricing_type"]
          sort_order?: number
        }
        Update: {
          active?: boolean
          base_price?: number | null
          code?: string
          description?: string | null
          module?: string
          name?: string
          premium_price?: number | null
          price_note?: string | null
          pricing_type?: Database["public"]["Enums"]["pricing_type"]
          sort_order?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_project_path: { Args: { _path: string }; Returns: boolean }
      can_edit_project: { Args: { _project_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_project_owner: { Args: { _project_id: string }; Returns: boolean }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
      pay_for_book: {
        Args: { _card_brand: string; _card_last4: string; _project_id: string }
        Returns: {
          amount: number
          card_brand: string
          card_last4: string
          created_at: string
          currency: string
          id: string
          owner_id: string
          project_id: string
          reference: string
          status: string
          test_mode: boolean
        }
        SetofOptions: {
          from: "*"
          to: "payments"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      app_role: "author" | "staff" | "admin"
      order_status: "quoted" | "paid" | "in_progress" | "delivered" | "approved"
      pricing_type: "per_word" | "per_hour" | "flat" | "quote" | "tiered"
      project_stage:
        | "draft"
        | "quoted"
        | "ordered"
        | "content"
        | "design"
        | "review"
        | "publishing"
        | "launched"
      source_type: "idea" | "manuscript" | "audio" | "monograph" | "interview"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["author", "staff", "admin"],
      order_status: ["quoted", "paid", "in_progress", "delivered", "approved"],
      pricing_type: ["per_word", "per_hour", "flat", "quote", "tiered"],
      project_stage: [
        "draft",
        "quoted",
        "ordered",
        "content",
        "design",
        "review",
        "publishing",
        "launched",
      ],
      source_type: ["idea", "manuscript", "audio", "monograph", "interview"],
    },
  },
} as const
