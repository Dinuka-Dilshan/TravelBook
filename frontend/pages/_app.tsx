// frontend/pages/_app.tsx
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/store/store';
import ThemeProvider from '@/theme';
import Notification from '@/components/Notification';
import '@/styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
        <Notification />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
