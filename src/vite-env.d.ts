/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** ID du formulaire Formspree (ex. "xmyzabcd"). Défini dans .env ou les variables Vercel. */
  readonly VITE_FORMSPREE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
