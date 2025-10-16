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
      historico_status_pagamento: {
        Row: {
          dados_n8n: Json | null
          data_mudanca: string | null
          id: string
          motivo: string | null
          status_anterior: Database["public"]["Enums"]["payment_status"] | null
          status_novo: Database["public"]["Enums"]["payment_status"]
          usuario_id: string
        }
        Insert: {
          dados_n8n?: Json | null
          data_mudanca?: string | null
          id?: string
          motivo?: string | null
          status_anterior?: Database["public"]["Enums"]["payment_status"] | null
          status_novo: Database["public"]["Enums"]["payment_status"]
          usuario_id: string
        }
        Update: {
          dados_n8n?: Json | null
          data_mudanca?: string | null
          id?: string
          motivo?: string | null
          status_anterior?: Database["public"]["Enums"]["payment_status"] | null
          status_novo?: Database["public"]["Enums"]["payment_status"]
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "historico_status_pagamento_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      metas: {
        Row: {
          cliente_id: string
          dados_n8n: Json | null
          data_fim: string | null
          data_inicio: string | null
          id: string
          progresso: number | null
          status: string | null
          tipo: string
          unidade: string
          valor_alvo: number
        }
        Insert: {
          cliente_id: string
          dados_n8n?: Json | null
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          progresso?: number | null
          status?: string | null
          tipo: string
          unidade: string
          valor_alvo: number
        }
        Update: {
          cliente_id?: string
          dados_n8n?: Json | null
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          progresso?: number | null
          status?: string | null
          tipo?: string
          unidade?: string
          valor_alvo?: number
        }
        Relationships: [
          {
            foreignKeyName: "metas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          altura: number | null
          avatar_url: string | null
          biografia: string | null
          configuracoes: Json | null
          configuracoes_consulta: Json | null
          dados_nutricionais: Json | null
          data_criacao: string | null
          data_expiracao_teste: string | null
          data_inicio: string | null
          data_proxima_cobranca: string | null
          data_ultimo_status: string | null
          email: string | null
          especialidade: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          meta_agua_ml: number | null
          meta_calorias: number | null
          meta_peso: number | null
          metadados: Json | null
          nome: string
          peso_atual: number | null
          preferencias: Json | null
          progresso_semanal: number | null
          registro_profissional: string | null
          sequencia_dias: number | null
          status_conta: Database["public"]["Enums"]["account_status"]
          status_pagamento: Database["public"]["Enums"]["payment_status"]
          taxa_sucesso: number | null
          telefone: string | null
          tipo: Database["public"]["Enums"]["user_type"]
          total_clientes: number | null
          ultima_atualizacao: string | null
        }
        Insert: {
          altura?: number | null
          avatar_url?: string | null
          biografia?: string | null
          configuracoes?: Json | null
          configuracoes_consulta?: Json | null
          dados_nutricionais?: Json | null
          data_criacao?: string | null
          data_expiracao_teste?: string | null
          data_inicio?: string | null
          data_proxima_cobranca?: string | null
          data_ultimo_status?: string | null
          email?: string | null
          especialidade?: string | null
          id: string
          is_active?: boolean | null
          last_login?: string | null
          meta_agua_ml?: number | null
          meta_calorias?: number | null
          meta_peso?: number | null
          metadados?: Json | null
          nome: string
          peso_atual?: number | null
          preferencias?: Json | null
          progresso_semanal?: number | null
          registro_profissional?: string | null
          sequencia_dias?: number | null
          status_conta?: Database["public"]["Enums"]["account_status"]
          status_pagamento?: Database["public"]["Enums"]["payment_status"]
          taxa_sucesso?: number | null
          telefone?: string | null
          tipo?: Database["public"]["Enums"]["user_type"]
          total_clientes?: number | null
          ultima_atualizacao?: string | null
        }
        Update: {
          altura?: number | null
          avatar_url?: string | null
          biografia?: string | null
          configuracoes?: Json | null
          configuracoes_consulta?: Json | null
          dados_nutricionais?: Json | null
          data_criacao?: string | null
          data_expiracao_teste?: string | null
          data_inicio?: string | null
          data_proxima_cobranca?: string | null
          data_ultimo_status?: string | null
          email?: string | null
          especialidade?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          meta_agua_ml?: number | null
          meta_calorias?: number | null
          meta_peso?: number | null
          metadados?: Json | null
          nome?: string
          peso_atual?: number | null
          preferencias?: Json | null
          progresso_semanal?: number | null
          registro_profissional?: string | null
          sequencia_dias?: number | null
          status_conta?: Database["public"]["Enums"]["account_status"]
          status_pagamento?: Database["public"]["Enums"]["payment_status"]
          taxa_sucesso?: number | null
          telefone?: string | null
          tipo?: Database["public"]["Enums"]["user_type"]
          total_clientes?: number | null
          ultima_atualizacao?: string | null
        }
        Relationships: []
      }
      registros_agua: {
        Row: {
          cliente_id: string
          dados_n8n: Json | null
          data_hora: string | null
          id: string
          notas: string | null
          quantidade_ml: number
          tipo_registro: string | null
        }
        Insert: {
          cliente_id: string
          dados_n8n?: Json | null
          data_hora?: string | null
          id?: string
          notas?: string | null
          quantidade_ml: number
          tipo_registro?: string | null
        }
        Update: {
          cliente_id?: string
          dados_n8n?: Json | null
          data_hora?: string | null
          id?: string
          notas?: string | null
          quantidade_ml?: number
          tipo_registro?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registros_agua_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      registros_alimentares: {
        Row: {
          analise_ia: Json | null
          calorias: number | null
          carboidratos: number | null
          cliente_id: string
          dados_n8n: Json | null
          data_hora: string | null
          descricao: string | null
          feedback_profissional: string | null
          foto_url: string | null
          gorduras: number | null
          id: string
          proteinas: number | null
          tipo_refeicao: string | null
        }
        Insert: {
          analise_ia?: Json | null
          calorias?: number | null
          carboidratos?: number | null
          cliente_id: string
          dados_n8n?: Json | null
          data_hora?: string | null
          descricao?: string | null
          feedback_profissional?: string | null
          foto_url?: string | null
          gorduras?: number | null
          id?: string
          proteinas?: number | null
          tipo_refeicao?: string | null
        }
        Update: {
          analise_ia?: Json | null
          calorias?: number | null
          carboidratos?: number | null
          cliente_id?: string
          dados_n8n?: Json | null
          data_hora?: string | null
          descricao?: string | null
          feedback_profissional?: string | null
          foto_url?: string | null
          gorduras?: number | null
          id?: string
          proteinas?: number | null
          tipo_refeicao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registros_alimentares_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      registros_peso: {
        Row: {
          cliente_id: string
          dados_n8n: Json | null
          data_registro: string | null
          id: string
          notas: string | null
          peso: number
        }
        Insert: {
          cliente_id: string
          dados_n8n?: Json | null
          data_registro?: string | null
          id?: string
          notas?: string | null
          peso: number
        }
        Update: {
          cliente_id?: string
          dados_n8n?: Json | null
          data_registro?: string | null
          id?: string
          notas?: string | null
          peso?: number
        }
        Relationships: [
          {
            foreignKeyName: "registros_peso_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      relacionamento_profissional_cliente: {
        Row: {
          cliente_id: string
          configuracoes: Json | null
          data_inicio: string | null
          notas: string | null
          profissional_id: string
          status: string | null
        }
        Insert: {
          cliente_id: string
          configuracoes?: Json | null
          data_inicio?: string | null
          notas?: string | null
          profissional_id: string
          status?: string | null
        }
        Update: {
          cliente_id?: string
          configuracoes?: Json | null
          data_inicio?: string | null
          notas?: string | null
          profissional_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "relacionamento_profissional_cliente_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relacionamento_profissional_cliente_profissional_id_fkey"
            columns: ["profissional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      get_all_profiles_admin: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          nome: string
          email: string
          telefone: string
          tipo: Database["public"]["Enums"]["user_type"]
          status_conta: Database["public"]["Enums"]["account_status"]
          status_pagamento: Database["public"]["Enums"]["payment_status"]
          is_active: boolean
          data_criacao: string
          last_login: string
          avatar_url: string
        }[]
      }
      get_current_user_type: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_type"]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      search_users_admin: {
        Args: {
          search_term?: string
          filter_tipo?: Database["public"]["Enums"]["user_type"]
          filter_status?: Database["public"]["Enums"]["account_status"]
          filter_active?: boolean
          limit_count?: number
          offset_count?: number
        }
        Returns: {
          id: string
          nome: string
          email: string
          telefone: string
          tipo: Database["public"]["Enums"]["user_type"]
          status_conta: Database["public"]["Enums"]["account_status"]
          status_pagamento: Database["public"]["Enums"]["payment_status"]
          is_active: boolean
          data_criacao: string
          last_login: string
          avatar_url: string
          total_count: number
        }[]
      }
      update_user_profile_admin: {
        Args: {
          user_id: string
          new_nome?: string
          new_email?: string
          new_telefone?: string
          new_tipo?: Database["public"]["Enums"]["user_type"]
          new_status_conta?: Database["public"]["Enums"]["account_status"]
          new_status_pagamento?: Database["public"]["Enums"]["payment_status"]
          new_is_active?: boolean
        }
        Returns: boolean
      }
    }
    Enums: {
      account_status: "ativo" | "inativo" | "pausado"
      payment_status:
        | "primeira_vez"
        | "teste"
        | "normal"
        | "assinatura"
        | "pendente"
      user_type: "cliente" | "profissional" | "admin"
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
      account_status: ["ativo", "inativo", "pausado"],
      payment_status: [
        "primeira_vez",
        "teste",
        "normal",
        "assinatura",
        "pendente",
      ],
      user_type: ["cliente", "profissional", "admin"],
    },
  },
} as const
