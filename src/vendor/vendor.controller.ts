import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { VendorDto } from './types/vendor';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('')
  async createVendor(@Body() createDto: CreateVendorDto) {
    return await this.vendorService.createVendor(createDto);
  }

  @Get('amount')
  async getVendorsAmount(
    @Query() query: { filter: keyof VendorDto; value: string },
  ) {
    return await this.vendorService.getVendorsCount(query);
  }

  @Post('by-page')
  async getVendorsByPage(
    @Body()
    data: {
      page: number;
      vendorsPerPage: number;
      vendorsFilter: { filter: keyof VendorDto; value: string };
    },
  ) {
    return await this.vendorService.getVendorsByPage(
      data.page,
      data.vendorsPerPage,
      data.vendorsFilter,
    );
  }

  @Delete('all')
  async deleteAllVendors(@Query() query: { secret: string }) {
    return await this.vendorService.deleteAllVendors({ secret: query.secret });
  }

  @Post('many')
  async createManyVendors(@Body() createDto: CreateVendorDto[]) {
    return await this.vendorService.createManyVendors(createDto);
  }

  @Get('hints')
  async getHints() {
    return await this.vendorService.getAllHints();
  }

  @Get('by-multiple')
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
      page: number;
      vendorsPerPage: number;
      order: 'asc' | 'desc';
    },
  ) {
    const { field, vendorsFilter, order, page, vendorsPerPage } = data;
    return await this.vendorService.sortVendors(
      field,
      vendorsFilter,
      vendorsPerPage,
      page,
      order,
    );
  }
}
