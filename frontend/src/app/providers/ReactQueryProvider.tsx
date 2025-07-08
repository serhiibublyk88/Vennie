import { QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { queryClient } from '@/shared/lib/queryClient';

export const ReactQueryProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
