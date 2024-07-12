import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { VendorDto } from './types/vendor';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('all')
  async getVendors() {
    return await this.vendorService.getVendors();
  }

  @Post('')
  async createVendor(@Body() createDto: CreateVendorDto) {
    return await this.vendorService.createVendor(createDto);
  }

  @Post('many')
  async createManyVendors(@Body() createDto: CreateVendorDto[]) {
    return await this.vendorService.createManyVendors(createDto);
  }

  @Get('hints')
  async getHints() {
    return await this.vendorService.getAllHints();
  }

  @Get('by-query')
  async getVendorsByQuery(@Query() data: { name: string; field: string }) {
    const { name, field } = data;
    return await this.vendorService.getVendorsBySearchQuery(name, field);
  }

  @Get('by-multiple/')
  async getVendorsByMultiple(
    @Query() data: { options: string[]; field: string },
  ) {
    const { options, field } = data;
    return await this.vendorService.getVendorsByMultipleOptions(options, field);
  }

  @Post('sort')
  async sortVendors(
    @Body()
    data: {
      field: keyof VendorDto;
      vendorsFilter: { filter: keyof VendorDto; value: string } | undefined;
      order: 'asc' | 'desc';
    },
  ) {
    const { field, vendorsFilter, order } = data;
    return await this.vendorService.sortVendors(field, vendorsFilter, order);
  }
}
