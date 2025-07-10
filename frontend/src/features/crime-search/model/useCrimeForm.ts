import { env } from '@/shared/config/env';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  address: z.string().min(3, 'Address is required'),
  month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM'),
});
export type CrimeSearchDto = z.infer<typeof schema>;

export const useCrimeForm = () => {
  const form = useForm<CrimeSearchDto>({
    resolver: zodResolver(schema),
    defaultValues: { address: '', month: '' },
    mode: 'onChange',
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const address = form.watch('address');

  useEffect(() => {
    if (address.length < 3) {
      setSuggestions([]);
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => {
      fetch(
        `${env.NOMINATIM_URL}/search?format=json&limit=5&countrycodes=gb&q=${encodeURIComponent(address)}`,
        { signal: ctrl.signal, headers: { 'Accept-Language': 'en' } }
      )
        .then((r) => r.json())
        .then((data) => setSuggestions(data.map((d: any) => d.display_name as string)))
        .catch(() => {});
    }, 2000);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [address]);

  return {
    form,
    suggestions,

    setAddress: (v: string) => form.setValue('address', v, { shouldValidate: true }),

    setSuggestions,
  };
};
