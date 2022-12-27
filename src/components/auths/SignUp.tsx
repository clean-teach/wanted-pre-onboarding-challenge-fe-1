import React from 'react';
import styled from 'styled-components';

function SignUp() {
  return (
    <div>
      <h1>SignUp</h1>
      <form>
        <input type="email" placeholder="이메일을 입력해주세요" />
        <input
          type="password"
          placeholder="패스워드는 8자 이상을 입력해주세요"
        />
        <input type="password" placeholder="패스워드 확인" />
      </form>
    </div>
  );
}

export default SignUp;
