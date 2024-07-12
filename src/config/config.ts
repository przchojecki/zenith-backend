import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { validate } from './utils';
import { Expose } from 'class-transformer';

class Config {
  @Expose()
  @IsString()
  FRONTEND_URL: string;

  @Expose()
  @IsString()
  MONGODB_URI: string;

  @Expose()
  @IsString()
  BACKEND_URL: string;

  @Expose()
  @IsString()
  REFRESH_SECRET: string;

  @Expose()
  @IsString()
  REFRESH_EXPIRE_IN: string;

  @Expose()
  @IsString()
  ACCESS_SECRET: string;

  @Expose()
  @IsString()
  ACCESS_EXPIRE_IN: string;
}

export default registerAs('config', () => {
  return validate(Config);
});
