import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as Joi from 'joi';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true })
  date: Date;

  //   @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  //   owner: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  director: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

export const joiMovieSchema = Joi.object({
  date: Joi.date().timestamp('unix').required(),
  title: Joi.string().required(),
  director: Joi.string().required(),
});
