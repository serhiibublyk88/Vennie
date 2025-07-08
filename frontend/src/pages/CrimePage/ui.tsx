import { useCrimeStats } from '@/features/crime-search/model/useCrimeStats';
import { AddressForm } from '@/features/crime-search/ui/AddressForm';

export const CrimePage = () => {
  const statsMutation = useCrimeStats();

  return (
    <section className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-semibold text-center">
        Enter an address in the UK and a date to see crime statistics
      </h1>

      <AddressForm onSubmit={statsMutation.mutate} />

      {statsMutation.isPending && <p>Loading…</p>}

      {statsMutation.isSuccess && (
        <pre className="bg-gray-800 p-4 rounded text-sm mt-4">
          {JSON.stringify(statsMutation.data, null, 2)}
        </pre>
      )}
    </section>
  );
};
