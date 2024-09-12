import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.SB_URL, process.env.SB_KEY)
console.log(supabase)