import React from 'react';
import styled from 'styled-components';
import {
  useRegisterMutation,
  useLoginMutation,
  MeQuery,
} from '../../generated/apolloComponents';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

import Button from '../button';
import { setAccessToken } from '../../lib/accessToken';
import { InputField } from '../fields/InputField';
import { meQuery } from '../../graphql/user/queries/me';

/////
// STYLES
/////

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

/////
// Formik
/////

const SignupSchema = Yup.object({
  email: Yup.string().required('Required').email('Invalid email'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password requires at least 8 characters')
    .max(30, 'Password may not exceed 30 characters'),
});

type formSchema = Yup.InferType<typeof SignupSchema>;

interface SignUpProps {
  isLoggedIn?: boolean;
}

/////
// Actual component we use in React
/////

const SignUp: React.FC<SignUpProps> = ({ isLoggedIn = false }) => {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  // const [findMe] = useMeQuery();
  const router = useRouter();

  const handleSubmit = async (data: any, { setErrors }: any) => {
    if (!isLoggedIn) {
      try {
        const response = await register({
          variables: {
            data,
          },
        });
        console.log(response);
      } catch (err) {
        // this console log was used to see which keys/values we had access to during an error
        // console.log('err:', Object.entries(err));

        // create a map where the key is a string and value is a string
        const errors: { [key: string]: string } = {};

        // we know its graphQLErrors[0] because of the commented out console log above
        err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
          (validationErr: any) => {
            Object.values(validationErr.constraints).forEach((message: any) => {
              errors[validationErr.property] = message;
            });
          }
        );
        setErrors(errors);
      }
    } else {
      const response = await login({
        variables: data,
        update: (cache, { data }) => {
          if (!data || !data.login) {
            return;
          }

          cache.writeQuery<MeQuery>({
            query: meQuery,
            data: {
              __typename: 'Query',
              me: data.login,
            },
          });
        },
      });
      // console.log(response);
      if (response && response.data && !response.data.login) {
        setErrors({
          email: 'invalid login',
        });
        return;
      }

      if (response && response.data && response.data.login) {
        console.log(response.data.login.accessToken);
        setAccessToken(response.data.login.accessToken);
      }
      router.push('/home');
    }
  };

  return (
    <>
      <Formik
        validateOnChange={false}
        onSubmit={handleSubmit}
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
      >
        {({ handleSubmit }) => (
          <SignUpForm onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              placeholder="Enter email"
              type="email"
              component={InputField}
            />

            <label htmlFor="password">Password</label>
            <Field
              name="password"
              placeholder="Enter password"
              type="password"
              component={InputField}
            />

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
        )}
      </Formik>
    </>
  );
};

// we have to wrap it in 'withRouter' HOC in order to get the history prop
export default SignUp;
