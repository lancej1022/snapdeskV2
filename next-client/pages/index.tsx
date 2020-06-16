import styled from 'styled-components';

import LoginForm from '../components/loginForm';

const LoginContainer = styled.main`
  @media screen and (min-width: ${(props) => props.theme.breakpointTablet}) {
    display: grid;
    grid-template-columns: 4fr 2fr;
    height: 100vh;
  }
`;

const LeftHero = styled.section`
  background: linear-gradient(rgba(13, 47, 129, 0.82), rgba(13, 47, 129, 0.82)),
    url('/login-bg-lg.jpg');
  background-size: cover;
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
    font-size: 3rem;

    @media screen and (min-width: ${(props) => props.theme.breakpointTablet}) {
      font-size: 4.5rem;
      line-height: 5rem;
      margin-top: 0;
      margin-bottom: 3rem;
    }

    @media screen and (min-width: ${(props) => props.theme.breakpointDesktop}) {
      font-size: 7.5rem;
      line-height: 8rem;
      margin-top: 0;
      margin-bottom: 5rem;
    }
  }

  p {
    color: ${(props) => props.theme.textWhite};
  }
`;

const RightHero = styled.section``;

const Index = () => {
  // The below code is for testing purposes, since fetchPolicy network-only PREVENTS apollo from caching the data
  // const { data } = useMeQuery({ fetchPolicy: 'network-only' });

  // the below code is for prod, where we let apollo cache our data
  // const { data } = useMeQuery();

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

export default Index;
