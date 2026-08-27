import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://argkashxfnbqjoqonyfh.supabase.co';
const supabaseKey = 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  'sb_publishable_vPWE81CyLXQQNqqJRRP_wQ_Ps7r17ee';

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
