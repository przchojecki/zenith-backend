import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtPayload } from './constants/jwt.payload';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectModel(RefreshToken.name) private refreshToken: Model<RefreshToken>,
    @Inject(config.KEY)
    private readonly configObject: ConfigType<typeof config>,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.userService.findOneByEmail(email);

    if (!compare(password, user.password)) {
      throw new Error('Invalid password');
    }

    const payload: JwtPayload = { email, sub: user.id };

    return this.generateTokenPair(payload);
  }

  async generateTokenPair(payload: JwtPayload) {
    const _at = this.jwtService.sign(payload, {
      secret: this.configObject.ACCESS_SECRET,
      expiresIn: this.configObject.ACCESS_EXPIRE_IN,
    });

    const _rt = this.jwtService.sign(payload, {
      secret: this.configObject.REFRESH_SECRET,
      expiresIn: this.configObject.REFRESH_EXPIRE_IN,
    });

    this.refreshToken.create({ token: _rt, userId: payload.sub });

    return { _at, _rt };
  }

  async refresh(refreshToken: string) {
    const payload: JwtPayload = this.jwtService.verify(refreshToken, {
      secret: this.configObject.REFRESH_SECRET,
    });

    this.refreshToken.findByIdAndUpdate(payload.sub, { token: refreshToken });

    return this.generateTokenPair(payload);
  }
}
