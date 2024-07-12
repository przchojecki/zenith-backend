import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

@Schema()
export class Vendor {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  websiteUrl: string;

  @Prop({
    type: [String],
    enum: ['customer_service', 'sales_support', 'customer_document_processing'],
    required: true,
  })
  useCase: string[];

  @Prop({
    enum: ['banking', 'healthcare', 'e-commerce'],
    type: [String],
    required: true,
  })
  industry: string[];

  @Prop({
    enum: ['text_gen', 'text_to_speech', 'speech_to_text', 'video_gen'],
    type: [String],
    required: true,
  })
  category: string[];

  @Prop({ type: Date })
  foundedDate: Date;
}

export type VendorDocument = HydratedDocument<Vendor>;

export const VendorSchema = SchemaFactory.createForClass(Vendor);
