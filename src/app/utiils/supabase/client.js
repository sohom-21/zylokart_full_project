import { createBrowserClient } from "@supabase/ssr";
import { configDotenv } from "dotenv";
configDotenv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export default supabase;