import { IsEmail, Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';

/**
 * Used for validating the registration information when a user attempts to sign up.
 * utilized in the UserResolver
 *
 * IsEmailAlready exist is used to check if an email address has already been registered
 */
@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'An account with that email address already exists' })
  email: string;

  @Field()
  @Length(8, 30)
  password: string;
}
