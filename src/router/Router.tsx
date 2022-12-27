import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/auths/Login';
import SignUp from '../components/auths/SignUp';
import TodoList from '../components/todos/TodoList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/auth',
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
      },
    ],
  },
]);

export default router;
