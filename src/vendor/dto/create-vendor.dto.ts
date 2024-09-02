import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  detailUrl: string;

  @IsString()
  logoUrl: string;

  @IsString()
  name: string;

  @IsString()
  shortDescription: string;

  @IsString()
  primaryTask: string;

  @IsArray()
  @IsString({ each: true })
  applicableTasks: string[];

  @IsString()
  fullDescription: string;

  @IsArray()
  @IsString({ each: true })
  pros: string[];

  @IsArray()
  @IsString({ each: true })
  cons: string[];

  @IsString()
  pricing: string;

  @IsString()
  visitWebsiteUrl: string;

  @IsString()
  @IsOptional()
  Q1: string | null;

  @IsString()
  @IsOptional()
  A1: string | null;

  @IsString()
  @IsOptional()
  Q2: string | null;

  @IsString()
  @IsOptional()
  A2: string | null;

  @IsString()
  @IsOptional()
  Q3: string | null;

  @IsString()
  @IsOptional()
  A3: string | null;

  @IsString()
  @IsOptional()
  Q4: string | null;

  @IsString()
  @IsOptional()
  A4: string | null;

  @IsString()
  @IsOptional()
  Q5: string | null;

  @IsString()
  @IsOptional()
  A5: string | null;

  @IsString()
  @IsOptional()
  Q6: string | null;

  @IsString()
  @IsOptional()
  A6: string | null;

  @IsString()
  @IsOptional()
  Q7: string | null;

  @IsString()
  @IsOptional()
  A7: string | null;

  @IsString()
  @IsOptional()
  Q8: string | null;

  @IsString()
  @IsOptional()
  A8: string | null;

  @IsString()
  @IsOptional()
  Q9: string | null;

  @IsString()
  @IsOptional()
  A9: string | null;

  @IsString()
  @IsOptional()
  Q10: string | null;

  @IsString()
  @IsOptional()
  A10: string | null;

  @IsString()
  @IsOptional()
  Q11: string | null;

  @IsString()
  @IsOptional()
  A11: string | null;

  @IsString()
  @IsOptional()
  Q12: string | null;

  @IsString()
  @IsOptional()
  A12: string | null;

  @IsString()
  @IsOptional()
  Q13: string | null;

  @IsString()
  @IsOptional()
  A13: string | null;

  @IsString()
  @IsOptional()
  Q14: string | null;

  @IsString()
  @IsOptional()
  A14: string | null;

  @IsString()
  @IsOptional()
  Q15: string | null;

  @IsString()
  @IsOptional()
  A15: string | null;

  @IsString()
  @IsOptional()
  Q16: string | null;

  @IsString()
  @IsOptional()
  A16: string | null;

  @IsString()
  @IsOptional()
  Q17: string | null;

  @IsString()
  @IsOptional()
  A17: string | null;

  @IsString()
  @IsOptional()
  Q18: string | null;

  @IsString()
  @IsOptional()
  A18: string | null;

  @IsString()
  @IsOptional()
  Q19: string | null;

  @IsString()
  @IsOptional()
  A19: string | null;

  @IsString()
  @IsOptional()
  Q20: string | null;

  @IsString()
  @IsOptional()
  A20: string | null;

  @IsString()
  @IsOptional()
  Q21: string | null;

  @IsString()
  @IsOptional()
  A21: string | null;

  @IsString()
  @IsOptional()
  Q22: string | null;

  @IsString()
  @IsOptional()
  A22: string | null;

  @IsString()
  @IsOptional()
  Q23: string | null;

  @IsString()
  @IsOptional()
  A23: string | null;

  @IsString()
  @IsOptional()
  Q24: string | null;

  @IsString()
  @IsOptional()
  A24: string | null;

  @IsString()
  @IsOptional()
  Q25: string | null;

  @IsString()
  @IsOptional()
  A25: string | null;

  @IsString()
  @IsOptional()
  Q26: string | null;

  @IsString()
  @IsOptional()
  A26: string | null;

  @IsString()
  @IsOptional()
  Q27: string | null;

  @IsString()
  @IsOptional()
  A27: string | null;

  @IsString()
  @IsOptional()
  Q28: string | null;

  @IsString()
  @IsOptional()
  A28: string | null;

  @IsString()
  @IsOptional()
  Q29: string | null;

  @IsString()
  @IsOptional()
  A29: string | null;

  @IsString()
  @IsOptional()
  Q30: string | null;

  @IsString()
  @IsOptional()
  A30: string | null;
}
