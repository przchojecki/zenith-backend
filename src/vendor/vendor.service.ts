import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vendor, VendorDocument } from './schemas/vendor.schema';
import { Model } from 'mongoose';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { VendorDto } from './types/vendor';
import { plainToInstance } from 'class-transformer';
import { ResponseVendorDto } from './dto/response-vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>,
  ) {}
  async getVendors() {
    const vendors = await this.vendorModel.find();

    if (!vendors) {
      throw new Error('No vendors found');
    }

    return vendors;
  }

  async createVendor(createDto: CreateVendorDto): Promise<ResponseVendorDto> {
    const vendor = await this.vendorModel.create(createDto);

    return plainToInstance(ResponseVendorDto, vendor);
  }

  async createManyVendors(
    createDto: CreateVendorDto[],
  ): Promise<ResponseVendorDto[]> {
    const vendors = [];
    createDto.map(async (dto) => {
      const vendor = await this.vendorModel.create(dto);

      if (!vendor) {
        throw new Error('Fail');
      }

      vendors.push(vendor);
    });

    return plainToInstance(ResponseVendorDto, vendors);
  }

  async getVendorsBySearchQuery(query: string, field: string) {
    try {
      const vendors = await this.vendorModel.find({
        [field]: new RegExp(query, 'i'),
      });

      return vendors;
    } catch (err) {
      console.log('Error');
    }
  }

  async getVendorsByMultipleOptions(queryOptions: string[], field: string) {
    try {
      if (field === 'location') {
        const vendors = await this.vendorModel.find({
          [field]: {
            $in: queryOptions.map((option) => new RegExp(option, 'i')),
          },
        });

        return vendors;
      }
      const vendors = await this.vendorModel.find({
        [field]: {
          $elemMatch: {
            $in: queryOptions.map((option) => new RegExp(option, 'i')),
          },
        },
      });

      return vendors;
    } catch (err) {
      console.error('Error fetching vendors:', err);
      throw err;
    }
  }

  async getAllHints() {
    try {
      const vendors = await this.vendorModel.find();
      const locations: string[] = [];
      const useCases: string[] = [];
      const industries: string[] = [];
      const categories: string[] = [];

      vendors.map((vendor) => {
        locations.push(vendor.location);

        vendor.useCase.map((useCase) => useCases.push(useCase));
        vendor.industry.map((industry) => industries.push(industry));
        vendor.category.map((category) => categories.push(category));
      });

      const uniqueLocations = Array.from(new Set(locations));
      const uniqueUseCases = Array.from(new Set(useCases));
      const uniqueIndustries = Array.from(new Set(industries));
      const uniqueCategories = Array.from(new Set(categories));

      return {
        locations: uniqueLocations,
        useCases: uniqueUseCases,
        industries: uniqueIndustries,
        categories: uniqueCategories,
      };
    } catch (err) {
      throw new Error('Couldn`t fetch hints');
    }
  }

  async sortVendors(
    field: keyof VendorDto,
    vendorsFilter: { filter: string; value: string | string[] },
    order: 'asc' | 'desc' = 'asc',
  ) {
    if (!vendorsFilter.filter) {
      console.log(
        await this.vendorModel
          .find()
          .sort({ [field]: order })
          .exec(),
      );
      return await this.vendorModel
        .find()
        .sort({ [field]: order })
        .exec();
    }
    let filter = {};

    if (!Array.isArray(vendorsFilter.value))
      filter = {
        [vendorsFilter.filter]: { $in: new RegExp(vendorsFilter.value, 'i') },
      };
    else if (vendorsFilter.filter === 'location')
      filter = {
        [vendorsFilter.filter]: {
          $in: vendorsFilter.value.map((option) => new RegExp(option, 'i')),
        },
      };
    else
      filter = {
        [vendorsFilter.filter]: {
          $elemMatch: {
            $in: vendorsFilter.value.map((option) => new RegExp(option, 'i')),
          },
        },
      };
    console.log(
      await this.vendorModel
        .find(filter)
        .sort({ [field]: order })
        .exec(),
    );
    return await this.vendorModel
      .find(filter)
      .sort({ [field]: order })
      .exec();
  }
}
