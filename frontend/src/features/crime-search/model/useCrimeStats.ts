import { fetchCrimeStats } from '@/entities/crime/api/fetchCrimeStats';
import { geocode } from '@/entities/crime/api/geocode';
import type { CrimeStatsResponse } from '@/entities/crime/model/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface Payload {
  address: string;
  month: string;
}

export const useCrimeStats = () =>
  useMutation<CrimeStatsResponse, Error, Payload>({
    mutationFn: async ({ address, month }: Payload) => {
      try {
        const result = await geocode(address);

        if (!result.postcode) {
          throw new Error('Postcode not found for this address');
        }

        return await fetchCrimeStats({ postcode: result.postcode, date: month });
      } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch crime statistics');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Unexpected error occurred');
    },
  });
