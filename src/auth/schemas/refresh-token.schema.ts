import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class RefreshToken {
  _id: Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true, type: Types.ObjectId })
  userId: string;
}

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
