import { createClient } from "@supabase/supabase-js";

// ============================================================================
// SUPABASE CONFIGURATION
// Paste your Supabase Project URL and Public Key below:
// ============================================================================

// 1. Paste your Supabase Project URL here:
const SUPABASE_URL = "https://qdnoglsoiqcgzvavhmuw.supabase.co/rest/v1";

// 2. Paste your Supabase Public API Key (anon key) here:
const SUPABASE_PUBLIC_KEY = "sb_publishable_zTOHPcbVtqfTqVdaWevF7A_Iyjs8nnE";

// ============================================================================
// URL FORMATTING & CLIENT INITIALIZATION
// (Automatically handles base URL paths like /rest/v1 so createClient connects cleanly)
// ============================================================================
const formattedUrl = (SUPABASE_URL || "")
  .replace(/[{}]/g, "")
  .replace(/\/rest\/v1\/?$/, "")
  .trim();

const formattedKey = (SUPABASE_PUBLIC_KEY || "")
  .replace(/[{}]/g, "")
  .trim();

// Export the single Supabase client instance
export const supabase = createClient(formattedUrl, formattedKey);
