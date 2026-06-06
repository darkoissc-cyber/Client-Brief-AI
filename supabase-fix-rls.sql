-- Step 1: Drop all existing policies
drop policy if exists "Allow public inserts" on submissions;
drop policy if exists "allow_public_inserts" on submissions;
drop policy if exists "anon_insert" on submissions;

-- Step 2: Disable RLS temporarily then re-enable
alter table submissions disable row level security;
alter table submissions enable row level security;

-- Step 3: Create a fully open insert policy for anon role
create policy "anon_insert"
  on submissions
  for insert
  to anon, authenticated
  with check (true);

-- Step 4: Also grant insert permission explicitly
grant insert on submissions to anon;
grant insert on submissions to authenticated;

-- Step 5: Verify policies
select policyname, cmd, roles, qual
from pg_policies
where tablename = 'submissions';
