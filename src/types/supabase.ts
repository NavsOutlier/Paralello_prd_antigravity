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
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            channels: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    is_archived: boolean | null
                    last_message_at: string | null
                    name: string
                    project_id: string
                    type: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_archived?: boolean | null
                    last_message_at?: string | null
                    name: string
                    project_id: string
                    type: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_archived?: boolean | null
                    last_message_at?: string | null
                    name?: string
                    project_id?: string
                    type?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "channels_project_id_fkey"
                        columns: ["project_id"]
                        isOneToOne: false
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    },
                ]
            }
            clients: {
                Row: {
                    created_at: string | null
                    email: string | null
                    id: string
                    last_meeting_date: string | null
                    metadata: Json | null
                    monthly_budget: number | null
                    name: string
                    notes: string | null
                    organization_id: string
                    phone: string
                    status: string | null
                    updated_at: string | null
                    whatsapp_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    last_meeting_date?: string | null
                    metadata?: Json | null
                    monthly_budget?: number | null
                    name: string
                    notes?: string | null
                    organization_id: string
                    phone: string
                    status?: string | null
                    updated_at?: string | null
                    whatsapp_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    last_meeting_date?: string | null
                    metadata?: Json | null
                    monthly_budget?: number | null
                    name?: string
                    notes?: string | null
                    organization_id?: string
                    phone?: string
                    status?: string | null
                    updated_at?: string | null
                    whatsapp_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "clients_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    },
                ]
            }
            messages: {
                Row: {
                    channel_id: string
                    content: string | null
                    created_at: string | null
                    id: string
                    is_read: boolean | null
                    message_type: string | null
                    metadata: Json | null
                    sender_id: string
                    sender_type: string
                    updated_at: string | null
                }
                Insert: {
                    channel_id: string
                    content?: string | null
                    created_at?: string | null
                    id?: string
                    is_read?: boolean | null
                    message_type?: string | null
                    metadata?: Json | null
                    sender_id: string
                    sender_type: string
                    updated_at?: string | null
                }
                Update: {
                    channel_id?: string
                    content?: string | null
                    created_at?: string | null
                    id?: string
                    is_read?: boolean | null
                    message_type?: string | null
                    metadata?: Json | null
                    sender_id?: string
                    sender_type?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "messages_channel_id_fkey"
                        columns: ["channel_id"]
                        isOneToOne: false
                        referencedRelation: "channels"
                        referencedColumns: ["id"]
                    },
                ]
            }
            organizations: {
                Row: {
                    created_at: string | null
                    id: string
                    name: string
                    plan: string | null
                    settings: Json | null
                    slug: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    name: string
                    plan?: string | null
                    settings?: Json | null
                    slug: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    name?: string
                    plan?: string | null
                    settings?: Json | null
                    slug?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string | null
                    full_name: string | null
                    id: string
                    organization_id: string
                    phone: string | null
                    role: string
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string | null
                    full_name?: string | null
                    id?: string
                    organization_id: string
                    phone?: string | null
                    role?: string
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string | null
                    full_name?: string | null
                    id?: string
                    organization_id?: string
                    phone?: string | null
                    role?: string
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    },
                ]
            }
            project_members: {
                Row: {
                    added_by: string | null
                    id: string
                    joined_at: string | null
                    profile_id: string
                    project_id: string
                    role: string | null
                }
                Insert: {
                    added_by?: string | null
                    id?: string
                    joined_at?: string | null
                    profile_id: string
                    project_id: string
                    role?: string | null
                }
                Update: {
                    added_by?: string | null
                    id?: string
                    joined_at?: string | null
                    profile_id?: string
                    project_id?: string
                    role?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "project_members_added_by_fkey"
                        columns: ["added_by"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "project_members_profile_id_fkey"
                        columns: ["profile_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "project_members_project_id_fkey"
                        columns: ["project_id"]
                        isOneToOne: false
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    },
                ]
            }
            projects: {
                Row: {
                    client_id: string
                    color: string | null
                    created_at: string | null
                    description: string | null
                    id: string
                    is_archived: boolean | null
                    name: string
                    organization_id: string
                    settings: Json | null
                    status: string | null
                    updated_at: string | null
                }
                Insert: {
                    client_id: string
                    color?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_archived?: boolean | null
                    name: string
                    organization_id: string
                    settings?: Json | null
                    status?: string | null
                    updated_at?: string | null
                }
                Update: {
                    client_id?: string
                    color?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    is_archived?: boolean | null
                    name?: string
                    organization_id?: string
                    settings?: Json | null
                    status?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "projects_client_id_fkey"
                        columns: ["client_id"]
                        isOneToOne: false
                        referencedRelation: "clients"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "projects_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    },
                ]
            }
            task_assignees: {
                Row: {
                    created_at: string | null
                    id: string
                    profile_id: string
                    task_id: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    profile_id: string
                    task_id: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    profile_id?: string
                    task_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "task_assignees_profile_id_fkey"
                        columns: ["profile_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "task_assignees_task_id_fkey"
                        columns: ["task_id"]
                        isOneToOne: false
                        referencedRelation: "tasks"
                        referencedColumns: ["id"]
                    },
                ]
            }
            task_checklists: {
                Row: {
                    created_at: string | null
                    id: string
                    is_completed: boolean | null
                    position: number | null
                    task_id: string
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    is_completed?: boolean | null
                    position?: number | null
                    task_id: string
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    is_completed?: boolean | null
                    position?: number | null
                    task_id?: string
                    title?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "task_checklists_task_id_fkey"
                        columns: ["task_id"]
                        isOneToOne: false
                        referencedRelation: "tasks"
                        referencedColumns: ["id"]
                    },
                ]
            }
            task_comments: {
                Row: {
                    content: string
                    created_at: string | null
                    id: string
                    profile_id: string
                    task_id: string
                    updated_at: string | null
                }
                Insert: {
                    content: string
                    created_at?: string | null
                    id?: string
                    profile_id: string
                    task_id: string
                    updated_at?: string | null
                }
                Update: {
                    content?: string
                    created_at?: string | null
                    id?: string
                    profile_id?: string
                    task_id?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "task_comments_profile_id_fkey"
                        columns: ["profile_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "task_comments_task_id_fkey"
                        columns: ["task_id"]
                        isOneToOne: false
                        referencedRelation: "tasks"
                        referencedColumns: ["id"]
                    },
                ]
            }
            tasks: {
                Row: {
                    completed_at: string | null
                    completed_by: string | null
                    created_at: string | null
                    description: string | null
                    due_date: string | null
                    estimated_hours: number | null
                    id: string
                    metadata: Json | null
                    organization_id: string
                    priority: string | null
                    project_id: string
                    source_message_id: string | null
                    status: string | null
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    completed_at?: string | null
                    completed_by?: string | null
                    created_at?: string | null
                    description?: string | null
                    due_date?: string | null
                    estimated_hours?: number | null
                    id?: string
                    metadata?: Json | null
                    organization_id: string
                    priority?: string | null
                    project_id: string
                    source_message_id?: string | null
                    status?: string | null
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    completed_at?: string | null
                    completed_by?: string | null
                    created_at?: string | null
                    description?: string | null
                    due_date?: string | null
                    estimated_hours?: number | null
                    id?: string
                    metadata?: Json | null
                    organization_id?: string
                    priority?: string | null
                    project_id?: string
                    source_message_id?: string | null
                    status?: string | null
                    title?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "tasks_completed_by_fkey"
                        columns: ["completed_by"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "tasks_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "tasks_project_id_fkey"
                        columns: ["project_id"]
                        isOneToOne: false
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "tasks_source_message_id_fkey"
                        columns: ["source_message_id"]
                        isOneToOne: false
                        referencedRelation: "messages"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_my_org_id: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database['public']

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof (DatabaseWithoutInternals[PublicTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? (DatabaseWithoutInternals[PublicTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
