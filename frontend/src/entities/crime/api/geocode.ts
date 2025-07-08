import { env } from '@/shared/config/env';

export const geocode = async (address: string): Promise<{ postcode: string }> => {
  const res = await fetch(
    `${env.NOMINATIM_URL}/search?format=json&limit=1&countrycodes=gb&q=${encodeURIComponent(address)}`,
    {
      headers: { 'Accept-Language': 'en' },
    }
  );

  const data = await res.json();

  if (!data?.[0]?.display_name) {
    throw new Error('Postcode not found');
  }

  const match = data[0].display_name.match(/([A-Z]{1,2}\d{1,2}[A-Z]?)\s?(\d[A-Z]{2})/);

  if (!match) {
    throw new Error('No valid UK postcode found in address');
  }

  return { postcode: `${match[1]} ${match[2]}` };
};
