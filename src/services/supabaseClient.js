import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jyysxleiouzchtrazqto.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eXN4bGVpb3V6Y2h0cmF6cXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNzA3MTcsImV4cCI6MjA0Nzg0NjcxN30.q86U-tXF8I7NbtC6npj6C6WO3UYEgr_C6Qu_ZKdaIbg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);













git config --global user.email "you@example.com"
  git config --global user.name "Your Name"