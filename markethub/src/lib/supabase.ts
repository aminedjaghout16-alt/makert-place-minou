// ─────────────────────────────────────────────
// Supabase Client Configuration
// PostgreSQL database + Storage
// ─────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Browser-safe Supabase client (uses anon key)
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server-side Supabase client (uses service role key — never expose to browser)
export function createServerSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey);
}

export { isConfigured as isSupabaseConfigured };

// ── Storage helpers ─────────────────────────
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, cacheControl: "3600" });
  if (error) {
    console.error("Upload error:", error);
    return null;
  }
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

export async function deleteFile(
  bucket: string,
  paths: string[]
): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.storage.from(bucket).remove(paths);
  return !error;
}
