import { CrimeChart } from '@/features/crime-chart/ui/CrimeChart';
import { useCrimeStats } from '@/features/crime-search/model/useCrimeStats';
import { AddressForm } from '@/features/crime-search/ui/AddressForm';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const CrimePage = () => {
  const statsMutation = useCrimeStats();

  useEffect(() => {
    if (statsMutation.isSuccess && Object.keys(statsMutation.data.crimes).length === 0) {
      toast.info('No data available for the selected period and location.');
    }
  }, [statsMutation.isSuccess, statsMutation.data]);

  return (
    <section className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-semibold text-center">
        Enter an address in the UK and a date to see crime statistics
      </h1>

      <AddressForm onSubmit={statsMutation.mutate} />

      {statsMutation.isPending && (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400" />
        </div>
      )}

      {statsMutation.isSuccess && Object.keys(statsMutation.data.crimes).length > 0 && (
        <CrimeChart data={statsMutation.data.crimes} />
      )}

      {statsMutation.isError && (
        <p className="text-red-400">An error occurred: {statsMutation.error.message}</p>
      )}
    </section>
  );
};
