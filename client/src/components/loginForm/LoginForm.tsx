import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.section`
  display: grid;
  place-items: center;
  width: 75%;
  height: 100%;
  padding: 1rem;
  margin: 0 auto;

  p {
    color: ${(props) => props.theme.textLight};
    font-size: 1.4rem;
    line-height: 150%;
  }
`;

interface Buttonprops {
  readonly logoUrl?: string;
}

const Button = styled.button<Buttonprops>`
  padding: 1rem;
  margin: 1rem 0;
  width: 100%;
  background: #fff;
  font-size: 1.6rem;
  border: 1px solid #d0d0d3;

  div {
    display: inline;
    padding-left: 3rem;
    background-image: ${({ logoUrl }) => `url(${logoUrl})`};
    background-repeat: no-repeat;
    background-position: left center;
    background-size: contain;
  }
`;

const LoginForm: React.FC = () => {
  return (
    <LoginContainer>
      <div>
        <h2>Sign In / Sign Up</h2>
        <p>
          We utilize OAuth in order to improve our security. Because we do not store your
          credentials on our servers, any attacks on our site cannot result in your
          sesnsitive information being leaked.
        </p>
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
