import { createClient } from "@supabase/supabase-js";

// ============================================================================
// SUPABASE CONFIGURATION
// Paste your Supabase Project URL and Public API Key (anon key) below:
// ============================================================================

const RAW_SUPABASE_URL = "https://qdnoglsoiqcgzvavhmuw.supabase.co";
const RAW_SUPABASE_PUBLIC_KEY = "sb_publishable_zTOHPcbVtqfTqVdaWevF7A_Iyjs8nnE";

/**
 * Sanitizes the URL by removing template brackets {{ }}, extra trailing rest paths, or whitespace
 */
function sanitizeSupabaseUrl(url) {
  if (!url || typeof url !== "string") {
    return "https://qdnoglsoiqcgzvavhmuw.supabase.co";
  }
  let clean = url.replace(/[{}]/g, "").trim();
  // Remove /rest/v1/ or /rest/v1 if included
  clean = clean.replace(/\/rest\/v1\/?$/, "");
  if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
    clean = `https://${clean}`;
  }
  return clean;
}

/**
 * Sanitizes the API key by removing template brackets {{ }} or whitespace
 */
function sanitizeSupabaseKey(key) {
  if (!key || typeof key !== "string") {
    return "sb_publishable_zTOHPcbVtqfTqVdaWevF7A_Iyjs8nnE";
  }
  return key.replace(/[{}]/g, "").trim();
}

export const SUPABASE_URL = sanitizeSupabaseUrl(RAW_SUPABASE_URL);
export const SUPABASE_PUBLIC_KEY = sanitizeSupabaseKey(RAW_SUPABASE_PUBLIC_KEY);

// Initialize and export the single Supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
