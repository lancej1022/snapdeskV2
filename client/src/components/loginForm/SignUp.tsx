import React, { useState, SyntheticEvent } from 'react';
import styled from 'styled-components';
import Button from '../button';
import {
  useRegisterMutation,
  useLoginMutation,
  MeDocument,
  MeQuery,
} from '../../generated/graphql';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { setAccessToken } from '../../accessToken';

const Input = styled.input`
  border: 1px solid #d0d0d3;
  padding-left: 2rem;
  height: 4rem;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 1rem;
    display: grid;
  }

  input {
    width: 100%;
    font-size: 1.6rem;
    line-height: 1.6;
  }

  p {
    font-size: 1.4rem;
    line-height: 1.5;
    color: ${(props) => props.theme.textLight};
  }

  a {
    color: ${({ theme }) => theme.colorPrimary};
    text-decoration: none;
  }
`;

interface SignUpProps extends RouteComponentProps {
  isLoggedIn?: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ isLoggedIn = false, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let response;
    // fire our register GQL query and await the response
    if (!isLoggedIn) {
      response = await register({
        variables: {
          email,
          password,
        },
      });
    } else {
      response = await login({
        variables: {
          email,
          password,
        },
        update: (store, { data }) => {
          if (!data) return null;
          store.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              // __typename: 'Query',
              me: data.login.user,
            },
          });
        },
      });

      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
      }
      history.push('/home');
    }

    console.log(response);
  };

  return (
    <>
      <SignUpForm onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <div>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </div>
        <label htmlFor="password">Password</label>
        <div>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>
        <Button
          type="submit"
          buttonColor={(props: any) => props.theme.colorPrimary}
          textColor={(props: any) => props.theme.textWhite}
          border={'false'}
        >
          {isLoggedIn ? 'Sign In' : 'Sign Up'}
        </Button>
        <p>
          This page is protected by reCAPTCHA, and subject to the Google&nbsp;
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          &nbsp;and&nbsp;
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of service
          </a>
          .
        </p>
      </SignUpForm>
    </>
  );
};

// we have to wrap it in 'withRouter' HOC in order to get the history prop
export default withRouter(SignUp);
