import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

function Login() {
  // const fetcher = async () => {
  //   return await axios.post('http://localhost:8080/users/create', {
  //       email: '11',
  //       password: '11',
  //     });
  // }
  // const { isLoading, data } = useQuery('queryKey', fetcher);
  // useEffect( () => {
  //   isLoading ? console.log('loading') : console.log(data);
  // }, [isLoading, data]);
  return <h1>login</h1>;
}

export default Login;
