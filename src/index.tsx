import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import router from './router/Router';
import { GlobalStyle } from './styles/GlobalStyle';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { whiteTheme } from './styles/theme';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log('onError', error);
    },
    onSuccess: (data) => {
      console.log('onSuccess', data);
    },
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={whiteTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>,
  // </React.StrictMode>
);
