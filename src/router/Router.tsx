import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LoginContainer from '../components/pages/auths/LoginContainer';
import SignUpContainer from '../components/pages/auths/SignUpContainer';
import TodoListContainer from '../components/pages/todos/TodoListContainer';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'auth',
          children: [
            {
              path: 'login',
              element: <LoginContainer />,
            },
            {
              path: 'signup',
              element: <SignUpContainer />,
            },
          ],
        },
        {
          path: 'todos',
          element: <TodoListContainer />,
          children: [
            {
              path: ':todoId/*',
              element: <TodoListContainer />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: '/wanted-pre-onboarding-challenge-fe-1',
  },
);

export default router;
