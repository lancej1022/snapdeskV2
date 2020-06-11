import React from 'react';
import styled from 'styled-components';
import SignUp from './SignUp';
import Button from '../button';

const LoginContainer = styled.section`
  display: grid;
  place-items: center;
  width: 75%;
  height: 100%;
  padding: 1rem;
  margin: 0 auto;

  h2 {
    margin-bottom: 0;
  }

  p {
    font-size: 1.4rem;
    margin: 0.5rem 0 1rem 0;
  }

  span {
    color: ${(props) => props.theme.colorPrimary};
    cursor: pointer;
  }
`;

const LoginForm: React.FC = () => {
  return (
    <LoginContainer>
      <div>
        <h2>Sign In</h2>
        <p>
          or <span>click here to sign up</span>
        </p>
        <SignUp />
        <Button logoUrl={'/Google-G-logo.svg'}>
          <div>Sign in with Google</div>
        </Button>
        <Button logoUrl={'/github-logo.svg'}>
          <div>Sign in with GitHub</div>
        </Button>
      </div>
    </LoginContainer>
  );
};

export default LoginForm;
