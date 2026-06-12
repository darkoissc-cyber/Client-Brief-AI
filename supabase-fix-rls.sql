-- Harden the submissions table for server-side writes only.
-- The app now submits through /api/submissions using SUPABASE_SERVICE_ROLE_KEY.

-- Remove legacy public insert policies.
drop policy if exists "Allow public inserts" on submissions;
drop policy if exists "allow_public_inserts" on submissions;
drop policy if exists "anon_insert" on submissions;

-- Keep RLS enabled and do not expose direct client inserts.
alter table submissions enable row level security;

revoke insert, update, delete, truncate, references, trigger on submissions from anon;
revoke insert, update, delete, truncate, references, trigger on submissions from authenticated;

-- Keep read access closed unless a separate admin UI intentionally adds policies.
revoke select on submissions from anon;
revoke select on submissions from authenticated;

-- Data integrity checks. These also protect service-role inserts from oversized
-- or invalid payloads.
alter table submissions
  drop constraint if exists submissions_project_name_len,
  drop constraint if exists submissions_client_name_len,
  drop constraint if exists submissions_client_email_len,
  drop constraint if exists submissions_project_description_len,
  drop constraint if exists submissions_business_description_len,
  drop constraint if exists submissions_project_problem_len,
  drop constraint if exists submissions_target_audience_len,
  drop constraint if exists submissions_primary_goal_len,
  drop constraint if exists submissions_visitor_action_len,
  drop constraint if exists submissions_needed_pages_len,
  drop constraint if exists submissions_important_features_len,
  drop constraint if exists submissions_liked_websites_len,
  drop constraint if exists submissions_competitors_len,
  drop constraint if exists submissions_notes_len,
  drop constraint if exists submissions_generated_brief_len,
  drop constraint if exists submissions_generated_prompt_len,
  drop constraint if exists submissions_platform_allowed,
  drop constraint if exists submissions_traffic_allowed,
  drop constraint if exists submissions_style_allowed,
  drop constraint if exists submissions_budget_allowed,
  drop constraint if exists submissions_timeline_allowed,
  drop constraint if exists submissions_content_provider_allowed,
  drop constraint if exists submissions_features_allowed,
  drop constraint if exists submissions_status_allowed;

alter table submissions
  add constraint submissions_project_name_len
    check (char_length(project_name) between 2 and 120),
  add constraint submissions_client_name_len
    check (char_length(client_name) between 2 and 120),
  add constraint submissions_client_email_len
    check (char_length(client_email) between 3 and 254),
  add constraint submissions_project_description_len
    check (char_length(project_description) between 100 and 4000),
  add constraint submissions_business_description_len
    check (business_description is null or char_length(business_description) between 150 and 4000),
  add constraint submissions_project_problem_len
    check (project_problem is null or char_length(project_problem) between 10 and 2000),
  add constraint submissions_target_audience_len
    check (target_audience is null or char_length(target_audience) between 10 and 2000),
  add constraint submissions_primary_goal_len
    check (primary_goal is null or char_length(primary_goal) between 10 and 2000),
  add constraint submissions_visitor_action_len
    check (visitor_action is null or char_length(visitor_action) between 10 and 1000),
  add constraint submissions_needed_pages_len
    check (needed_pages is null or char_length(needed_pages) between 10 and 3000),
  add constraint submissions_important_features_len
    check (important_features is null or char_length(important_features) between 10 and 3000),
  add constraint submissions_liked_websites_len
    check (liked_websites is null or char_length(liked_websites) between 10 and 3000),
  add constraint submissions_competitors_len
    check (competitors is null or char_length(competitors) between 2 and 3000),
  add constraint submissions_notes_len
    check (notes is null or char_length(notes) <= 3000),
  add constraint submissions_generated_brief_len
    check (generated_brief is null or char_length(generated_brief) <= 20000),
  add constraint submissions_generated_prompt_len
    check (generated_prompt is null or char_length(generated_prompt) <= 20000),
  add constraint submissions_platform_allowed
    check (platform in ('nextjs', 'wordpress', 'shopify', 'custom')),
  add constraint submissions_traffic_allowed
    check (traffic in ('under-10k', '10k-100k', '100k-1m', 'over-1m', 'unsure')),
  add constraint submissions_style_allowed
    check (style in ('minimalist', 'colorful', 'corporate', 'bold')),
  add constraint submissions_budget_allowed
    check (budget in ('under-5k', '5k-15k', '15k-30k', 'over-30k')),
  add constraint submissions_timeline_allowed
    check (timeline in ('1-month', '1-3-months', '3-6-months', 'flexible')),
  add constraint submissions_content_provider_allowed
    check (content_provider in ('client', 'developer', 'collab')),
  add constraint submissions_features_allowed
    check (
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
  add constraint submissions_status_allowed
    check (status in ('new', 'reviewed', 'archived'));

select policyname, cmd, roles, qual, with_check
from pg_policies
where tablename = 'submissions';
