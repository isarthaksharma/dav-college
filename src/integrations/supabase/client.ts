
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://huxncrtjxkohorsiakyx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1eG5jcnRqeGtvaG9yc2lha3l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMjE3MjksImV4cCI6MjA2MTc5NzcyOX0.dAeZl4Rs2AVZATgikGBCS41tmUv8vtW0PQKKjlJZJbU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
