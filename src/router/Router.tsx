import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/auths/Login';
import SignUp from '../components/auths/SignUp';
import TodoList from '../components/todos/TodoList';
import TodoView from '../components/todos/TodoView';

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
          element: <TodoList />,
          children: [
            {
              path: ':todoId/*',
              element: <TodoList />,
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
