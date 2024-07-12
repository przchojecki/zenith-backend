import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('No user found');
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await this.userModel.create({
      ...data,
      password: hashedPassword,
    });
  }
}
