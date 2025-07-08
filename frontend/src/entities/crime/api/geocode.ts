import { env } from '@/shared/config/env';

export const geocode = async (address: string) => {
  const url = `${env.NOMINATIM_URL}/search?format=json&limit=1&countrycodes=gb&q=${encodeURIComponent(address)}`;
  const [first] = await fetch(url, { headers: { 'Accept-Language': 'en' } }).then((r) => r.json());
  if (!first) throw new Error('Address not found');
  return { lat: Number(first.lat), lon: Number(first.lon) };
};
