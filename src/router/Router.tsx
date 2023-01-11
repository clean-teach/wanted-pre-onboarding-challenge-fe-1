import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/pages/auths/Login';
import SignUp from '../components/pages/auths/SignUp';
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
              element: <Login />,
            },
            {
              path: 'signup',
              element: <SignUp />,
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
