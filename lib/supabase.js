import { createClient } from "@supabase/supabase-js";

export const supabase = createClient('https://rujhylbasedavctyitpz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1amh5bGJhc2VkYXZjdHlpdHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2NjQyMTgsImV4cCI6MjAyMTI0MDIxOH0.2Ms57lghxcyiZUDFHFj7fwj9trHJxTQvNyxo2VZYpTY')
console.log(supabase)