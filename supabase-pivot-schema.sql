-- Enums
DO $$ BEGIN
    CREATE TYPE freelancer_persona AS ENUM ('DEVELOPER', 'DESIGNER', 'MARKETER', 'AGENCY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE chat_status AS ENUM ('CHATTING', 'ANALYZING', 'COMPLETED', 'ERROR');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  persona freelancer_persona NOT NULL DEFAULT 'DEVELOPER',
  notion_token TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  brief_data JSONB,
  status TEXT NOT NULL DEFAULT 'active',
  freelancer_persona freelancer_persona NOT NULL DEFAULT 'DEVELOPER',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Chat Sessions Table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  status chat_status NOT NULL DEFAULT 'CHATTING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content VARCHAR(5000) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Deliverables Table
CREATE TABLE IF NOT EXISTS deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('SRS', 'STYLE_GUIDE', 'SOW')),
  markdown_content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_project_id ON chat_sessions(project_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_deliverables_project_id ON deliverables(project_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent conflicts during migration
DROP POLICY IF EXISTS "Users can manage their own records" ON users;
DROP POLICY IF EXISTS "Freelancers full access to own projects" ON projects;
DROP POLICY IF EXISTS "Anonymous clients read specific project details" ON projects;
DROP POLICY IF EXISTS "Freelancers view chat sessions for own projects" ON chat_sessions;
DROP POLICY IF EXISTS "Anonymous clients select specific session by ID" ON chat_sessions;
DROP POLICY IF EXISTS "Anonymous clients update active session by ID" ON chat_sessions;
DROP POLICY IF EXISTS "Freelancers view chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Anonymous clients select messages for active session" ON chat_messages;
DROP POLICY IF EXISTS "Anonymous clients insert messages for active session" ON chat_messages;
DROP POLICY IF EXISTS "Freelancers full access to deliverables" ON deliverables;
DROP POLICY IF EXISTS "Anonymous clients read own deliverables" ON deliverables;

-- 6. RLS Policies Definition

-- Users policies
CREATE POLICY "Users can manage their own records" ON users
  FOR ALL USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Freelancers full access to own projects" ON projects
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous clients read specific project details" ON projects
  FOR SELECT TO anon
  USING (status = 'active');

-- Chat Sessions policies
CREATE POLICY "Freelancers view chat sessions for own projects" ON chat_sessions
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = chat_sessions.project_id AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Anonymous clients select specific session by ID" ON chat_sessions
  FOR SELECT TO anon
  USING (id = id);

CREATE POLICY "Anonymous clients update active session by ID" ON chat_sessions
  FOR UPDATE TO anon
  USING (id = id AND status = 'CHATTING')
  WITH CHECK (id = id AND status = 'CHATTING');

-- Chat Messages policies
CREATE POLICY "Freelancers view chat messages" ON chat_messages
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM chat_sessions
    JOIN projects ON projects.id = chat_sessions.project_id
    WHERE chat_sessions.id = chat_messages.session_id AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Anonymous clients select messages for active session" ON chat_messages
  FOR SELECT TO anon
  USING (session_id = session_id);

CREATE POLICY "Anonymous clients insert messages for active session" ON chat_messages
  FOR INSERT TO anon
  WITH CHECK (
    session_id = session_id 
    AND EXISTS (
      SELECT 1 FROM chat_sessions
      WHERE chat_sessions.id = session_id AND chat_sessions.status = 'CHATTING'
    )
  );

-- Deliverables policies
CREATE POLICY "Freelancers full access to deliverables" ON deliverables
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = deliverables.project_id AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Anonymous clients read own deliverables" ON deliverables
  FOR SELECT TO anon
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = deliverables.project_id AND projects.status = 'completed'
  ));
