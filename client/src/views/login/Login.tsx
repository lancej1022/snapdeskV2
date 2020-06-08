import React from 'react';
import styled from 'styled-components';

import LoginForm from '../../components/loginForm';

const LoginContainer = styled.main`
  display: grid;
  grid-template-columns: 4fr 2fr;
  height: 100vh;
`;

const LeftHero = styled.section`
  background-color: ${(props) => props.theme.colorDark};
  color: ${(props) => props.theme.colorLight};
  display: grid;
  place-items: center;

  div {
    width: 70%;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 7.5rem;
    line-height: 8rem;
    margin-top: 0;
    margin-bottom: 5rem;
  }

  p {
    color: ${(props) => props.theme.textWhite};
  }
`;

const RightHero = styled.section``;

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <LeftHero>
        <div>
          <h1>SnapDesk</h1>
          <h2>Foster Collaboration In Your Organization</h2>
          <p>
            SnapDesk is the perfect application to improve teamwork between the juniors
            and seniors within your organization. Juniors post work-related questions,
            seniors answer them, and you gain valuable analytics in the process!
          </p>
        </div>
      </LeftHero>
      <RightHero>
        <LoginForm />
      </RightHero>
    </LoginContainer>
  );
};

export default Login;
