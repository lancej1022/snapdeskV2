import React, { useState } from 'react';
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

interface LoginFormProps {
  isLoggedIn?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <LoginContainer>
      <div>
        <h2>{isLoggedIn ? 'Sign In' : 'Sign Up'}</h2>
        <p>
          or&nbsp;
          <span onClick={handleClick}>
            click here to {isLoggedIn ? 'sign up' : 'sign in'}
          </span>
        </p>
        <SignUp isLoggedIn={isLoggedIn} />
        <Button logoUrl={'/Google-G-logo.svg'}>
          <div>{isLoggedIn ? 'Sign in' : 'Sign up'} with Google</div>
        </Button>
        <Button logoUrl={'/github-logo.svg'}>
          <div>{isLoggedIn ? 'Sign in' : 'Sign up'} with GitHub</div>
        </Button>
      </div>
    </LoginContainer>
  );
};

export default LoginForm;
