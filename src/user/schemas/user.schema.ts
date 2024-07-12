import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ unique: true, type: String, required: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
