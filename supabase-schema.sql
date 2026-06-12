-- Supabase database schema for Client Brief AI.
-- Public browser clients must not write directly to this table.

create table submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_name text not null check (char_length(project_name) between 2 and 120),
  client_name text not null check (char_length(client_name) between 2 and 120),
  client_email text not null check (char_length(client_email) between 3 and 254),
  project_description text not null check (char_length(project_description) between 100 and 4000),
  business_description text check (business_description is null or char_length(business_description) between 150 and 4000),
  project_problem text check (project_problem is null or char_length(project_problem) between 10 and 2000),
  target_audience text check (target_audience is null or char_length(target_audience) between 10 and 2000),
  primary_goal text check (primary_goal is null or char_length(primary_goal) between 10 and 2000),
  visitor_action text check (visitor_action is null or char_length(visitor_action) between 10 and 1000),
  needed_pages text check (needed_pages is null or char_length(needed_pages) between 10 and 3000),
  important_features text check (important_features is null or char_length(important_features) between 10 and 3000),
  liked_websites text check (liked_websites is null or char_length(liked_websites) between 10 and 3000),
  platform text not null check (platform in ('nextjs', 'wordpress', 'shopify', 'custom')),
  features text[] not null check (
    cardinality(features) between 1 and 8
    and features <@ array[
      'auth',
      'payments',
      'cms',
      'integrations',
      'search',
      'analytics',
      'multilingual',
      'realtime'
    ]::text[]
  ),
  traffic text not null check (traffic in ('under-10k', '10k-100k', '100k-1m', 'over-1m', 'unsure')),
  style text not null check (style in ('minimalist', 'colorful', 'corporate', 'bold')),
  has_guidelines boolean,
  competitors text check (competitors is null or char_length(competitors) between 2 and 3000),
  budget text not null check (budget in ('under-5k', '5k-15k', '15k-30k', 'over-30k')),
  timeline text not null check (timeline in ('1-month', '1-3-months', '3-6-months', 'flexible')),
  content_provider text not null check (content_provider in ('client', 'developer', 'collab')),
  notes text check (notes is null or char_length(notes) <= 3000),
  generated_brief text check (generated_brief is null or char_length(generated_brief) <= 20000),
  generated_prompt text check (generated_prompt is null or char_length(generated_prompt) <= 20000),
  status text default 'new' check (status in ('new', 'reviewed', 'archived'))
);

alter table submissions enable row level security;

revoke all on submissions from anon;
revoke all on submissions from authenticated;

create index idx_submissions_created_at on submissions(created_at);
create index idx_submissions_status on submissions(status);
