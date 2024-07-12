import { IsString, IsArray, IsEnum, IsDate, IsOptional } from 'class-validator';

export class VendorDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsString()
  websiteUrl: string;

  @IsArray()
  @IsEnum(
    ['customer_service', 'sales_support', 'customer_document_processing'],
    { each: true },
  )
  useCase: string[];

  @IsArray()
  @IsEnum(['banking', 'healthcare', 'e-commerce'], { each: true })
  industry: string[];

  @IsArray()
  @IsEnum(['text_gen', 'text_to_speech', 'speech_to_text', 'video_gen'], {
    each: true,
  })
  category: string[];

  @IsOptional()
  @IsDate()
  foundedDate?: Date;
}
