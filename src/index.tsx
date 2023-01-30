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
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 윈도우에 포커스가 되면 데이터를 다시 가져올지 여부
      refetchOnMount: true, // DOM에 컴포넌트가 처음 생성되었을 때 데이터를 가져올지 여부
    },
  },
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
