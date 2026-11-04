import { createClient } from '@supabase/supabase-js'

export const BUCKET = 'portfolio'

/** The database client, or null when the Supabase env vars are not set. Server only. */
export function getDb() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}
