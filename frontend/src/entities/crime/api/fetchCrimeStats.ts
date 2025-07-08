import type { CrimeStatsResponse } from '@/entities/crime/model/types';
import { api } from '@/shared/lib/axios';

export const fetchCrimeStats = (payload: { postcode: string; date: string }) =>
  api.post<CrimeStatsResponse>('/crime-stats', payload).then((res) => res.data);
