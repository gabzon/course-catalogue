// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly PUBLIC_TYPESENSE_HOST: string
    readonly PUBLIC_TYPESENSE_API_KEY: string
    readonly PUBLIC_TYPESENSE_PORT: string
    readonly PUBLIC_TYPESENSE_PROTOCOL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }