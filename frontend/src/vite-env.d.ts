/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_NOMINATIM_URL: string;
  readonly VITE_NOMINATIM_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
