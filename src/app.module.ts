import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserSchema } from './user/schemas/user.schema';
import { VendorModule } from './vendor/vendor.module';
import { VendorSchema } from './vendor/schemas/vendor.schema';
import { AuthModule } from './auth/auth.module';
import { RefreshTokenSchema } from './auth/schemas/refresh-token.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Vendor', schema: VendorSchema },
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
    UserModule,
    VendorModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
