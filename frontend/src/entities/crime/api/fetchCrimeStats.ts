import type { CrimeStatsResponse } from '@/entities/crime/model/types';
import { api } from '@/shared/lib/axios';

export const fetchCrimeStats = (payload: { lat: number; lon: number; month: string }) =>
  api.post<CrimeStatsResponse>('/crime-stats', payload).then((r) => r.data);
