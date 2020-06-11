import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

/**
 * Basically maps to a table in our database
 * the @entity('users) basically says to name the table users
 *
 * extending baseEntity allows us to use commands like User.save();
 *
 * the email column is passed a type of "string" so that Postgres will create a text column, BUT...
 * typeorm will automatically infer the correct one anyways, hence the password column works without 'text' as the arg
 * HOWEVER it cannot infer numbers because it doesnt know if they're floats
 *
 * In order to ALSO use this as a type-graphql type (not just a db table), we can use @ObjectType decorator
 * and then just annotate the fields
 */
@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  email: string;

  // note that we're not interested in exposing the password, so it has no Field for our Type
  @Column()
  password: string;

  // whenever we create a token, pass in the version of the token
  @Column('int', { default: 0 })
  tokenVersion: number;
}
