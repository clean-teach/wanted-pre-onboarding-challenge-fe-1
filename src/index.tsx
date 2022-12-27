import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import router from './router/Router';
import { GlobalStyle } from './styles/GlobalStyle';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </QueryClientProvider>,
  // </React.StrictMode>
);
