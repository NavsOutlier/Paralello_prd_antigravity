-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. organizations
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    plan VARCHAR(50) DEFAULT 'starter',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_organizations_slug ON organizations(slug);
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- 2. profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    role VARCHAR(50) DEFAULT 'member' NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_organization_id ON profiles(organization_id);
CREATE INDEX idx_profiles_role ON profiles(role);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. clients
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    whatsapp_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    monthly_budget DECIMAL(10,2),
    last_meeting_date DATE,
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_organization_id ON clients(organization_id);
CREATE INDEX idx_clients_phone ON clients(phone);
CREATE INDEX idx_clients_status ON clients(status);
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- 4. projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    is_archived BOOLEAN DEFAULT false,
    color VARCHAR(7) DEFAULT '#2563EB',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_organization_id ON projects(organization_id);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 5. project_members
CREATE TABLE project_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    role VARCHAR(50) DEFAULT 'member',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    added_by UUID REFERENCES profiles(id),
    UNIQUE(project_id, profile_id)
);

CREATE INDEX idx_project_members_project_id ON project_members(project_id);
CREATE INDEX idx_project_members_profile_id ON project_members(profile_id);
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;

-- 6. channels
CREATE TABLE channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'external' or 'internal'
    description TEXT,
    is_archived BOOLEAN DEFAULT false,
    last_message_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_channels_project_id ON channels(project_id);
CREATE INDEX idx_channels_type ON channels(type);
CREATE INDEX idx_channels_last_message_at ON channels(last_message_at DESC);
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;

-- 7. messages
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE NOT NULL,
    sender_type VARCHAR(50) NOT NULL, -- 'client', 'user', 'system'
    sender_id UUID NOT NULL, -- client_id or profile_id
    content TEXT,
    message_type VARCHAR(50) DEFAULT 'text', -- 'text', 'image', 'audio', 'file'
    metadata JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_channel_id ON messages(channel_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 8. tasks
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'todo',
    priority VARCHAR(20) DEFAULT 'medium',
    due_date DATE,
    estimated_hours DECIMAL(5,2),
    completed_at TIMESTAMPTZ,
    completed_by UUID REFERENCES profiles(id),
    source_message_id UUID REFERENCES messages(id),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_organization_id ON tasks(organization_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status ON tasks(status);
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- 9. task_assignees
CREATE TABLE task_assignees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(task_id, profile_id)
);

CREATE INDEX idx_task_assignees_task_id ON task_assignees(task_id);
CREATE INDEX idx_task_assignees_profile_id ON task_assignees(profile_id);
ALTER TABLE task_assignees ENABLE ROW LEVEL SECURITY;

-- 10. task_checklists
CREATE TABLE task_checklists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    position INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_task_checklists_task_id ON task_checklists(task_id);
ALTER TABLE task_checklists ENABLE ROW LEVEL SECURITY;

-- 11. task_comments
CREATE TABLE task_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_task_comments_task_id ON task_comments(task_id);
ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;

-- TRIGGERS for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_channels_updated_at BEFORE UPDATE ON channels FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_task_checklists_updated_at BEFORE UPDATE ON task_checklists FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_task_comments_updated_at BEFORE UPDATE ON task_comments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- RLS POLICIES

-- Helper function to get current user's organization_id
CREATE OR REPLACE FUNCTION get_my_org_id()
RETURNS UUID AS $$
  SELECT organization_id FROM profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Helper function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Organizations: users can only see their own, super admins see all
CREATE POLICY "Users view org" ON organizations FOR SELECT USING (id = get_my_org_id() OR is_super_admin());
CREATE POLICY "Admins manage org" ON organizations FOR ALL USING (is_super_admin());

-- Profiles: users see colleagues, super admins see all
CREATE POLICY "Users view profiles" ON profiles FOR SELECT USING (organization_id = get_my_org_id() OR is_super_admin());
CREATE POLICY "Admins manage profiles" ON profiles FOR ALL USING (is_super_admin());

-- Clients: users see company clients, super admins see all
CREATE POLICY "Users view clients" ON clients FOR ALL USING (organization_id = get_my_org_id() OR is_super_admin());

-- Projects: users see company projects, super admins see all
CREATE POLICY "Users view projects" ON projects FOR ALL USING (organization_id = get_my_org_id() OR is_super_admin());

-- Project Members
CREATE POLICY "Users view project members" ON project_members
FOR SELECT USING (project_id IN (SELECT id FROM projects WHERE organization_id = get_my_org_id()) OR is_super_admin());

-- Channels
CREATE POLICY "Users view channels" ON channels
FOR SELECT USING (project_id IN (SELECT id FROM projects WHERE organization_id = get_my_org_id()) OR is_super_admin());

-- Messages
CREATE POLICY "Users view messages" ON messages
FOR SELECT USING (channel_id IN (SELECT id FROM channels WHERE project_id IN (SELECT id FROM projects WHERE organization_id = get_my_org_id())) OR is_super_admin());

CREATE POLICY "Users send messages" ON messages
FOR INSERT WITH CHECK (channel_id IN (SELECT id FROM channels WHERE project_id IN (SELECT id FROM projects WHERE organization_id = get_my_org_id())) OR is_super_admin());

-- Tasks
CREATE POLICY "Users view tasks" ON tasks
FOR ALL USING (organization_id = get_my_org_id() OR is_super_admin());

-- Task Assignees, Checklists, Comments
CREATE POLICY "Users manage task assignees" ON task_assignees FOR ALL USING (task_id IN (SELECT id FROM tasks WHERE organization_id = get_my_org_id()) OR is_super_admin());
CREATE POLICY "Users manage task checklists" ON task_checklists FOR ALL USING (task_id IN (SELECT id FROM tasks WHERE organization_id = get_my_org_id()) OR is_super_admin());
CREATE POLICY "Users manage task comments" ON task_comments FOR ALL USING (task_id IN (SELECT id FROM tasks WHERE organization_id = get_my_org_id()) OR is_super_admin());

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, organization_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    (NEW.raw_user_meta_data->>'organization_id')::UUID,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The trigger on auth.users must be created manually in Supabase as it's in a different schema
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
