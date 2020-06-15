import React from 'react';
import Layout from '../components/Layout';
import { Formik, Field } from 'formik';
import { InputField } from '../components/fields/InputField';
import { RegisterComponent } from '../generated/apolloComponents';

export default () => {
  return (
    <Layout>
      <RegisterComponent>
        {(register) => (
          <Formik
            onSubmit={async (data, { setErrors }) => {
              try {
                const response = await register({
                  variables: {
                    data,
                  },
                });
                console.log(response);
              } catch (err) {
                // this console log was used to see which keys/values we had access to during an error
                console.log('err:', Object.entries(err));
                console.log(
                  'specific:',
                  err.graphQLErrors[0].extensions.exception.validationErrors
                );

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
            }}
            initialValues={{
              email: '',
              password: '',
            }}
          >
            {({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="Enter email"
                  type="email"
                  component={InputField}
                />
                {/* Could use the native formik component, but its easier to style in our custom one */}
                {/* <ErrorMessage name="email" /> */}
                <Field
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  component={InputField}
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </Formik>
        )}
      </RegisterComponent>
    </Layout>
  );
};
