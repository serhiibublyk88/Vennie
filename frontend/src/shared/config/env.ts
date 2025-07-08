export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  NOMINATIM_URL: import.meta.env.VITE_NOMINATIM_URL,
  NOMINATIM_API_KEY: import.meta.env.VITE_NOMINATIM_API_KEY ?? '',
} as const;
