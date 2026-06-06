import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vettsebqontuzndivwbs.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_9SZKEP0AdHleQx1sMWhW1w_JIXFaN-x';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
