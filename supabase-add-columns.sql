-- Migration script to add new questionnaire fields to the submissions table
alter table submissions
  add column if not exists business_description text,
  add column if not exists project_problem text,
  add column if not exists target_audience text,
  add column if not exists primary_goal text,
  add column if not exists visitor_action text,
  add column if not exists needed_pages text,
  add column if not exists important_features text,
  add column if not exists liked_websites text;
