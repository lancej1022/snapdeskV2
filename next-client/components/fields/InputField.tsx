import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldProps } from 'formik';
import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid #d0d0d3;
  padding-left: 2rem;
  height: 4rem;
`;

const ErrDiv = styled.div`
  color: red;
`;

// the props came from simply copy pasting what TS was complaining it wanted our InputField to look like :)
type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const errMessage = touched[field.name] && errors[field.name];
  return (
    <div>
      {errMessage && <ErrDiv>{errMessage}</ErrDiv>}
      <Input {...field} {...props} />
    </div>
  );
};
