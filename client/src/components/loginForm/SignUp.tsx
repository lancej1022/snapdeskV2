import React, { useState, useEffect, SyntheticEvent } from 'react';
import styled from 'styled-components';
import Button from '../button';

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

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(email, password);
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
        <p>
          This page is protected by reCAPTCHA, and subject to the Google&nbsp;
          <a href="https://policies.google.com/privacy" target="_blank">
            Privacy Policy
          </a>
          &nbsp;and&nbsp;
          <a href="https://policies.google.com/terms" target="_blank">
            Terms of service
          </a>
          .
        </p>
        <Button
          type="submit"
          buttonColor={(props: any) => props.theme.colorPrimary}
          textColor={(props: any) => props.theme.textWhite}
          border={'false'}
        >
          Sign In
        </Button>
      </SignUpForm>
    </>
  );
};

export default SignUp;
