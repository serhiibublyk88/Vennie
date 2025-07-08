import { Controller } from 'react-hook-form';
import { useCrimeForm } from '../model/useCrimeForm';

type Props = {
  onSubmit: (values: { address: string; month: string }) => void;
};

export const AddressForm = ({ onSubmit }: Props) => {
  const { form, suggestions, setAddress, setSuggestions } = useCrimeForm();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl flex flex-col gap-4">
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <div className="relative">
            <input
              {...field}
              placeholder="SW1A 1AA or 10 Downing St"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2"
            />
            {errors.address && (
              <p className="text-sm text-rose-400 mt-1">{errors.address.message}</p>
            )}

            {!!suggestions.length && (
              <ul className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded max-h-48 overflow-y-auto">
                {suggestions.map((s) => (
                  <li
                    key={s}
                    className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setAddress(s);
                      setSuggestions([]);
                      setTimeout(() => {
                        (document.activeElement as HTMLElement)?.blur();
                      }, 0);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      />

      <Controller
        name="month"
        control={control}
        render={({ field }) => (
          <>
            <input
              type="month"
              {...field}
              className="w-52 bg-gray-800 border border-gray-600 rounded px-3 py-2"
            />
            {errors.month && <p className="text-sm text-rose-400 mt-1">{errors.month.message}</p>}
          </>
        )}
      />

      <button
        type="submit"
        disabled={!isValid}
        className="self-start bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded px-4 py-2 transition-colors"
      >
        Show statistics
      </button>
    </form>
  );
};
