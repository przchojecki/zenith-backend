import { IsArray, IsDate, IsEnum, IsString } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly location: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly websiteUrl: string;

  @IsArray()
  @IsEnum(
    ['customer_service', 'sales_support', 'customer_document_processing'],
    { each: true },
  )
  readonly useCase: string[];

  @IsArray()
  @IsEnum(['banking', 'healthcare', 'e-commerce'], { each: true })
  readonly industry: string[];

  @IsArray()
  @IsEnum(['text_gen', 'text_to_speech', 'speech_to_text', 'video_gen'], {
    each: true,
  })
  readonly category: string[];

  @IsDate()
  readonly foundedDate: Date;
}
