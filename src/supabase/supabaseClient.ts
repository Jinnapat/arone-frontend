import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://rzkqeplvwprxjqdlkmus.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6a3FlcGx2d3ByeGpxZGxrbXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyODkzMTgsImV4cCI6MjAxMDg2NTMxOH0.qvcghlUENSRm1M69YMd4bkMTEAdoOgd45hVLwubga2k"
);

export default supabaseClient;
