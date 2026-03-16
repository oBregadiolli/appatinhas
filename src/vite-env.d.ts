/// <reference types="vite/client" />

// ============================================================
// vite-env.d.ts — Tipos do Vite (import.meta.env)
// ============================================================

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
