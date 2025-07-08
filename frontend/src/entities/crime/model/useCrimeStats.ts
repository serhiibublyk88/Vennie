import { fetchCrimeStats } from '@/entities/crime/api/fetchCrimeStats';
import { geocode } from '@/entities/crime/api/geocode';
import type { CrimeStatsResponse } from '@/entities/crime/model/types';
import { useMutation } from '@tanstack/react-query';

interface Payload {
  address: string;
  month: string;
}

export const useCrimeStats = () =>
  useMutation<CrimeStatsResponse, string, Payload>({
    mutationFn: async ({ address, month }: Payload) => {
      const { lat, lon } = await geocode(address);
      return fetchCrimeStats({ lat, lon, month });
    },
  });
