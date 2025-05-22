export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      certificates: {
        Row: {
          access_log: Json | null
          asset_code: string
          assigned_custodian: string | null
          consignment_content: string | null
          consignment_package: string | null
          created_at: string | null
          current_asset_status: string | null
          date_of_deposit: string | null
          depositor_name: string | null
          depositor_nationality: string | null
          document_expiry: string | null
          id: string
          internal_notes: string | null
          last_verification_date: string | null
          next_of_kin_name: string | null
          next_of_kin_nationality: string | null
          next_verification_date: string | null
          purpose_of_deposit: string | null
          security_charges_per_week: string | null
          security_code: string | null
          transaction_code: string | null
          vault_code: string | null
        }
        Insert: {
          access_log?: Json | null
          asset_code: string
          assigned_custodian?: string | null
          consignment_content?: string | null
          consignment_package?: string | null
          created_at?: string | null
          current_asset_status?: string | null
          date_of_deposit?: string | null
          depositor_name?: string | null
          depositor_nationality?: string | null
          document_expiry?: string | null
          id?: string
          internal_notes?: string | null
          last_verification_date?: string | null
          next_of_kin_name?: string | null
          next_of_kin_nationality?: string | null
          next_verification_date?: string | null
          purpose_of_deposit?: string | null
          security_charges_per_week?: string | null
          security_code?: string | null
          transaction_code?: string | null
          vault_code?: string | null
        }
        Update: {
          access_log?: Json | null
          asset_code?: string
          assigned_custodian?: string | null
          consignment_content?: string | null
          consignment_package?: string | null
          created_at?: string | null
          current_asset_status?: string | null
          date_of_deposit?: string | null
          depositor_name?: string | null
          depositor_nationality?: string | null
          document_expiry?: string | null
          id?: string
          internal_notes?: string | null
          last_verification_date?: string | null
          next_of_kin_name?: string | null
          next_of_kin_nationality?: string | null
          next_verification_date?: string | null
          purpose_of_deposit?: string | null
          security_charges_per_week?: string | null
          security_code?: string | null
          transaction_code?: string | null
          vault_code?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          company: string
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string
          phone: string
          status: Database["public"]["Enums"]["message_status"] | null
        }
        Insert: {
          company: string
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          message: string
          phone: string
          status?: Database["public"]["Enums"]["message_status"] | null
        }
        Update: {
          company?: string
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string
          status?: Database["public"]["Enums"]["message_status"] | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_details: {
        Row: {
          description: string
          icon: string | null
          id: string
          order_index: number
          title: string
          updated_at: string
          base_price: number
          price_per_kg: number
          min_weight: number
          max_weight: number
          is_international: boolean
          delivery_time_min: number
          delivery_time_max: number
        }
        Insert: {
          description: string
          icon?: string | null
          id: string
          order_index?: number
          title: string
          updated_at?: string
          base_price?: number
          price_per_kg?: number
          min_weight?: number
          max_weight?: number
          is_international?: boolean
          delivery_time_min?: number
          delivery_time_max?: number
        }
        Update: {
          description?: string
          icon?: string | null
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
          base_price?: number
          price_per_kg?: number
          min_weight?: number
          max_weight?: number
          is_international?: boolean
          delivery_time_min?: number
          delivery_time_max?: number
        }
        Relationships: []
      }
      shipments: {
        Row: {
          id: string
          tracking_id: string
          user_id: string
          service_id: string
          sender_name: string
          sender_email: string
          sender_phone: string
          sender_street: string
          sender_city: string
          sender_state: string
          sender_postal_code: string
          sender_country: string
          recipient_name: string
          recipient_email: string
          recipient_phone: string
          recipient_street: string
          recipient_city: string
          recipient_state: string
          recipient_postal_code: string
          recipient_country: string
          parcel_description: string
          weight: number
          length: number
          width: number
          height: number
          status: string
          expected_delivery_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tracking_id: string
          user_id: string
          service_id: string
          sender_name: string
          sender_email: string
          sender_phone: string
          sender_street: string
          sender_city: string
          sender_state: string
          sender_postal_code: string
          sender_country: string
          recipient_name: string
          recipient_email: string
          recipient_phone: string
          recipient_street: string
          recipient_city: string
          recipient_state: string
          recipient_postal_code: string
          recipient_country: string
          parcel_description: string
          weight: number
          length: number
          width: number
          height: number
          status?: string
          expected_delivery_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tracking_id?: string
          user_id?: string
          service_id?: string
          sender_name?: string
          sender_email?: string
          sender_phone?: string
          sender_street?: string
          sender_city?: string
          sender_state?: string
          sender_postal_code?: string
          sender_country?: string
          recipient_name?: string
          recipient_email?: string
          recipient_phone?: string
          recipient_street?: string
          recipient_city?: string
          recipient_state?: string
          recipient_postal_code?: string
          recipient_country?: string
          parcel_description?: string
          weight?: number
          length?: number
          width?: number
          height?: number
          status?: string
          expected_delivery_date?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      timeline_events: {
        Row: {
          created_at: string
          description: string
          id: string
          location: string | null
          shipment_id: string | null
          status: string
          timestamp: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          location?: string | null
          shipment_id?: string | null
          status: string
          timestamp?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          location?: string | null
          shipment_id?: string | null
          status?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "timeline_events_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_tracking_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      message_status: "pending" | "read" | "responded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      message_status: ["pending", "read", "responded"],
    },
  },
} as const
