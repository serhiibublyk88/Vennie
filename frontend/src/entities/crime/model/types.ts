export type CrimeCategory = string;
export interface CrimeStatsResponse {
  crimes: Record<CrimeCategory, number>;
}
