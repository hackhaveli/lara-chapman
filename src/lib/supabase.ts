import { createClient } from '@supabase/supabase-js'

// Placeholder values for development - replace with actual values when ready
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://xyzcompany.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.M9nC9pCjYE5L5R7cZqZ5Q5xZ5Z5Z5Z5Z5Z5Z5Z5Z5Z5'

// Validate URL before creating client
const validUrl = supabaseUrl.startsWith('https://') ? supabaseUrl : 'https://xyzcompany.supabase.co'

export const supabase = createClient(validUrl, supabaseAnonKey)
