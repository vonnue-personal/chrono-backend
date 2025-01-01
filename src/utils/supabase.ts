import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SERVICE_ROLE_KEY, SUPABSAE_URL } from "../secrets";

export const supabaseClient = createClient(SUPABSAE_URL, SUPABASE_SERVICE_ROLE_KEY)