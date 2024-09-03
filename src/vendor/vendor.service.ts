import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vendor, VendorDocument } from './schemas/vendor.schema';
import { Model, PipelineStage } from 'mongoose';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { VendorDto } from './types/vendor';
import { plainToInstance } from 'class-transformer';
import { ResponseVendorDto } from './dto/response-vendor.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createVendor(createDto: CreateVendorDto): Promise<ResponseVendorDto> {
    try {
      const vendor = await this.vendorModel.create(createDto);
      return plainToInstance(ResponseVendorDto, vendor);
    } catch (err) {
      console.log(createDto.name);
      console.log(err);
    }
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

  async getVendorsByMultipleOptions(queryOptions: string[], field: string) {
    try {
      if (field === 'primaryTask') {
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

  async getVendorsCount(vendorsFilter: {
    filter: string;
    value: string | string[];
  }): Promise<number> {
    try {
      const { filter: field, value } = vendorsFilter;

      if (!field) {
        return await this.vendorModel.countDocuments();
      }

      const filter: any = {};

      if (field) {
        if (!Array.isArray(value)) {
          filter[field] = {
            $regex: new RegExp(value, 'i'),
          };
        } else if (field === 'primaryTask') {
          filter[field] = {
            $in: value.map((option) => new RegExp(option, 'i')),
          };
        } else {
          filter[field] = {
            $elemMatch: {
              $in: value.map((option) => new RegExp(option, 'i')),
            },
          };
        }
      }

      const count = await this.vendorModel.countDocuments(filter);
      return count;
    } catch (err) {
      console.log('Error', err);
      return 0;
    }
  }

  async getAllHints() {
    try {
      const cachedHints = await this.cacheManager.get('hints');
      if (cachedHints) {
        return cachedHints;
      }

      const aggregatePipeline = [
        {
          $facet: {
            uniquePrimaryTasks: [
              {
                $group: {
                  _id: null,
                  uniquePrimaryTasks: { $addToSet: '$primaryTask' },
                },
              },
              { $project: { _id: 0, uniquePrimaryTasks: 1 } },
            ],
            uniqueApplicableTasks: [
              { $unwind: '$applicableTasks' },
              {
                $group: {
                  _id: null,
                  uniqueApplicableTasks: { $addToSet: '$applicableTasks' },
                },
              },
              { $project: { _id: 0, uniqueApplicableTasks: 1 } },
            ],
          },
        },
      ];

      const hints = await this.vendorModel.aggregate(aggregatePipeline);

      const result = {
        primaryTasks: hints[0].uniquePrimaryTasks[0].uniquePrimaryTasks,
        applicableTasks:
          hints[0].uniqueApplicableTasks[0].uniqueApplicableTasks,
      };

      await this.cacheManager.set('hints', result);

      return result;
    } catch (err) {
      console.log(err);
      throw new Error('Couldn`t fetch hints');
    }
  }

  async deleteAllVendors({ secret }: { secret: string }) {
    try {
      if (secret !== 'deletion_key') return;
      console.log('Deleting all vendors');
      await this.vendorModel.deleteMany({});
    } catch (err) {
      console.log('Error', err);
    }
  }

  async sortVendors(
    field: keyof VendorDto,
    vendorsFilter: { filter: string; value: string | string[] },
    vendorsPerPage: number,
    page: number,
    order: 'asc' | 'desc' = 'asc',
  ) {
    try {
      const sortOrder = order === 'asc' ? 1 : -1;
      const filter: any = {};

      if (vendorsFilter.filter) {
        if (!Array.isArray(vendorsFilter.value)) {
          filter[vendorsFilter.filter] = {
            $regex: new RegExp(vendorsFilter.value, 'i'),
          };
        } else if (vendorsFilter.filter === 'primaryTask') {
          filter[vendorsFilter.filter] = {
            $in: vendorsFilter.value.map((option) => new RegExp(option, 'i')),
          };
        } else {
          filter[vendorsFilter.filter] = {
            $elemMatch: {
              $in: vendorsFilter.value.map((option) => new RegExp(option, 'i')),
            },
          };
        }
      }

      const arrayFields: Array<keyof VendorDocument> = [
        'applicableTasks',
        'pros',
        'cons',
      ];

      let sortStage;
      if (arrayFields.includes(field)) {
        sortStage = {
          $sort: {
            [`${field}.0`]: sortOrder,
          },
        };
      } else {
        sortStage = {
          $sort: {
            [field]: sortOrder,
          },
        };
      }

      const pipeline: PipelineStage[] = [
        ...(Object.keys(filter).length > 0 ? [{ $match: filter }] : []),
        sortStage,
        { $skip: (page - 1) * vendorsPerPage },
        { $limit: vendorsPerPage },
      ];

      return await this.vendorModel.aggregate(pipeline).exec();
    } catch (err) {
      console.error('Sorting error', err);
      throw err;
    }
  }

  async getVendorsByPage(
    page: number,
    vendorsPerPage: number,
    vendorsFilter: { filter: string; value: string | string[] },
  ) {
    try {
      let vendors;

      const { filter: field, value } = vendorsFilter;

      const filter: any = {};

      if (field) {
        if (!Array.isArray(value)) {
          filter[field] = {
            $regex: new RegExp(value, 'i'),
          };
        } else if (field === 'primaryTask') {
          filter[field] = {
            $in: value.map((option) => new RegExp(option, 'i')),
          };
        } else {
          filter[field] = {
            $elemMatch: {
              $in: value.map((option) => new RegExp(option, 'i')),
            },
          };
        }
      }

      if (!field) {
        vendors = await this.vendorModel
          .find()
          .skip((page - 1) * vendorsPerPage)
          .limit(vendorsPerPage);
      } else {
        vendors = await this.vendorModel
          .find(filter)
          .skip((page - 1) * vendorsPerPage)
          .limit(vendorsPerPage);
      }

      return vendors;
    } catch (err) {
      console.log('Error', err);
    }
  }
}
