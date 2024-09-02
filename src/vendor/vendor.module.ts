import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, VendorSchema } from './schemas/vendor.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]),
    CacheModule.register(),
  ],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
