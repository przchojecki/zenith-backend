import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

@Schema()
export class Vendor {
  _id: Types.ObjectId;

  @Prop({ type: String, index: true })
  detailUrl: string;

  @Prop({ type: String, index: true })
  logoUrl: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  name: string;

  @Prop({ type: String, index: true })
  shortDescription: string;

  @Prop({ type: String, index: true })
  primaryTask: string;

  @Prop({ type: [String], index: true })
  applicableTasks: string[];

  @Prop({ type: String, index: true })
  fullDescription: string;

  @Prop({ type: [String], index: true })
  pros: string[];

  @Prop({ type: [String], index: true })
  cons: string[];

  @Prop({ type: String, index: true })
  pricing: string;

  @Prop({ type: String, index: true })
  visitWebsiteUrl: string;

  @Prop({ type: String, default: null, index: true })
  Q1: string | null;

  @Prop({ type: String, default: null, index: true })
  A1: string | null;

  @Prop({ type: String, default: null, index: true })
  Q2: string | null;

  @Prop({ type: String, default: null, index: true })
  A2: string | null;

  @Prop({ type: String, default: null, index: true })
  Q3: string | null;

  @Prop({ type: String, default: null, index: true })
  A3: string | null;

  @Prop({ type: String, default: null, index: true })
  Q4: string | null;

  @Prop({ type: String, default: null, index: true })
  A4: string | null;

  @Prop({ type: String, default: null, index: true })
  Q5: string | null;

  @Prop({ type: String, default: null, index: true })
  A5: string | null;

  @Prop({ type: String, default: null, index: true })
  Q6: string | null;

  @Prop({ type: String, default: null, index: true })
  A6: string | null;

  @Prop({ type: String, default: null, index: true })
  Q7: string | null;

  @Prop({ type: String, default: null, index: true })
  A7: string | null;

  @Prop({ type: String, default: null, index: true })
  Q8: string | null;

  @Prop({ type: String, default: null, index: true })
  A8: string | null;

  @Prop({ type: String, default: null, index: true })
  Q9: string | null;

  @Prop({ type: String, default: null, index: true })
  A9: string | null;

  @Prop({ type: String, default: null, index: true })
  Q10: string | null;

  @Prop({ type: String, default: null, index: true })
  A10: string | null;

  @Prop({ type: String, default: null, index: true })
  Q11: string | null;

  @Prop({ type: String, default: null, index: true })
  A11: string | null;

  @Prop({ type: String, default: null, index: true })
  Q12: string | null;

  @Prop({ type: String, default: null, index: true })
  A12: string | null;

  @Prop({ type: String, default: null, index: true })
  Q13: string | null;

  @Prop({ type: String, default: null, index: true })
  A13: string | null;

  @Prop({ type: String, default: null, index: true })
  Q14: string | null;

  @Prop({ type: String, default: null, index: true })
  A14: string | null;

  @Prop({ type: String, default: null, index: true })
  Q15: string | null;

  @Prop({ type: String, default: null, index: true })
  A15: string | null;

  @Prop({ type: String, default: null, index: true })
  Q16: string | null;

  @Prop({ type: String, default: null, index: true })
  A16: string | null;

  @Prop({ type: String, default: null, index: true })
  Q17: string | null;

  @Prop({ type: String, default: null, index: true })
  A17: string | null;

  @Prop({ type: String, default: null, index: true })
  Q18: string | null;

  @Prop({ type: String, default: null, index: true })
  A18: string | null;

  @Prop({ type: String, default: null, index: true })
  Q19: string | null;

  @Prop({ type: String, default: null, index: true })
  A19: string | null;

  @Prop({ type: String, default: null, index: true })
  Q20: string | null;

  @Prop({ type: String, default: null, index: true })
  A20: string | null;

  @Prop({ type: String, default: null, index: true })
  Q21: string | null;

  @Prop({ type: String, default: null, index: true })
  A21: string | null;

  @Prop({ type: String, default: null, index: true })
  Q22: string | null;

  @Prop({ type: String, default: null, index: true })
  A22: string | null;

  @Prop({ type: String, default: null, index: true })
  Q23: string | null;

  @Prop({ type: String, default: null, index: true })
  A23: string | null;

  @Prop({ type: String, default: null, index: true })
  Q24: string | null;

  @Prop({ type: String, default: null, index: true })
  A24: string | null;

  @Prop({ type: String, default: null, index: true })
  Q25: string | null;

  @Prop({ type: String, default: null, index: true })
  A25: string | null;

  @Prop({ type: String, default: null, index: true })
  Q26: string | null;

  @Prop({ type: String, default: null, index: true })
  A26: string | null;

  @Prop({ type: String, default: null, index: true })
  Q27: string | null;

  @Prop({ type: String, default: null, index: true })
  A27: string | null;

  @Prop({ type: String, default: null, index: true })
  Q28: string | null;

  @Prop({ type: String, default: null, index: true })
  A28: string | null;

  @Prop({ type: String, default: null, index: true })
  Q29: string | null;

  @Prop({ type: String, default: null, index: true })
  A29: string | null;

  @Prop({ type: String, default: null, index: true })
  Q30: string | null;

  @Prop({ type: String, default: null, index: true })
  A30: string | null;
}

export type VendorDocument = HydratedDocument<Vendor>;

export const VendorSchema = SchemaFactory.createForClass(Vendor);
