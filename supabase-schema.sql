-- Supabase Database Schema
-- Run this in your Supabase SQL Editor to create the submissions table and relevant indexes.

create table submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_name text not null,
  client_name text not null,
  client_email text not null,
  project_description text not null,
  business_description text,
  project_problem text,
  target_audience text,
  primary_goal text,
  visitor_action text,
  needed_pages text,
  important_features text,
  liked_websites text,
  platform text not null,
  features text[] not null default '{}',
  traffic text not null,
  style text not null,
  has_guidelines boolean,
  competitors text,
  budget text not null,
  timeline text not null,
  content_provider text not null,
  notes text,
  generated_brief text,
  generated_prompt text,
  status text default 'new'
);

-- Enable RLS (Row Level Security) if desired. For now, since auth is not implemented:
-- alter table submissions enable row level security;
-- create policy "Allow public inserts" on submissions for insert with check (true);

-- Indexes for performance and scalability
create index idx_submissions_created_at on submissions(created_at);
create index idx_submissions_status on submissions(status);
