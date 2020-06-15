import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldProps } from 'formik';

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
      <input {...field} {...props} />
      {errMessage && <div>{errMessage}</div>}
    </div>
  );
};
