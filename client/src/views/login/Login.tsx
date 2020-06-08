import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.main`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const LeftHero = styled.section``;

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <LeftHero>
        <h1>SnapDesk</h1>
        <h2>Foster Collaboration In Your Organization</h2>
        <p>
          SnapDesk is the perfect application to improve teamwork between the juniors and
          seniors within your organization. Juniors post work-related questions, seniors
          answer them, and you gain valuable analytics in the process!
        </p>
      </LeftHero>
    </LoginContainer>
  );
};

export default Login;
