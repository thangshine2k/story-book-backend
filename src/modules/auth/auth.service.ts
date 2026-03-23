/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginDto, RegisterDto } from './auth.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const { password, ...rest } = dto;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hash: string = await bcrypt.hash(password, 10);

    const user: User = this.repo.create({
      ...rest,
      password: hash,
    });

    return this.repo.save(user);
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user: User | null = await this.repo.findOne({
      where: { email: dto.email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, prettier/prettier
    const isMatch: boolean = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token: string = this.jwt.sign({ userId: user.id });

    return {
      access_token: token,
    };
  }
}
