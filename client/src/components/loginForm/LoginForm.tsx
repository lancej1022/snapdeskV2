import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.section`
  display: grid;
  place-items: center;
  width: 80%;
  margin: 0 auto;
`;

const Button = styled.button`
  padding: 1rem;
  width: 100%;
`;

const LoginForm: React.FC = () => {
  return (
    <>
      <h2>Sign In &sol; Sign Up</h2>
      <Button>Sign in with Google</Button>
      <Button>Sign in with GitHub</Button>
    </>
  );
};

export default LoginForm;
