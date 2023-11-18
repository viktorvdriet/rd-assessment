import '@/styles/globals.css'
import '@radix-ui/themes/styles.css';
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Theme } from '@radix-ui/themes';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme appearance="dark" accentColor="green" radius="small" scaling="95%">
        <Component {...pageProps} />
      </Theme>
    </QueryClientProvider>
  );
}
