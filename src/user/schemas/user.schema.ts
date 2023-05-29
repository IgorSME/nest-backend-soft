import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Joi, { ObjectSchema } from 'joi';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: [true, 'Set name for user'],
    minlength: 3,
  })
  username: string;

  @Prop({
    required: [true, 'Set email for user'],
    unique: true,
    // validate: {
    //       validator: (value: string) => {
    //         return Joi.string().email({ tlds: { allow: false } }).validate(value).error === null;
    //       },
    //       message: 'Invalid email format',
    //     },
  })
  email: string;

  @Prop({
    required: [true, 'Set password for user'],
    minlength: 6,
  })
  password: string;

  @Prop({
    default: null,
  })
  accessToken: string;

  @Prop({
    default: null,
  })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// export const joiRegisterSchema:ObjectSchema = Joi.object({
//     username: Joi.string().min(3).required(),
//     password: Joi.string().min(6).required(),
//     email: Joi.string()
//       .email({ tlds: { allow: false } })
//       .required(),
//   });
//   export const joiLoginSchema = Joi.object({
//     password: Joi.string().min(6).required(),
//     email: Joi.string()
//       .email({ tlds: { allow: false } })
//       .required(),
//   });
//   export const joiRefreshTokenSchema:ObjectSchema = Joi.object({
//     refreshToken: Joi.string().required(),
//   });