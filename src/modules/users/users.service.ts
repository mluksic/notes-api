import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  // oauth
  async validate(userData: User): Promise<User> {
    return await this.findByUsername(userData.username);
  }

  // TODO: FIX
  async login(user: User): Promise<any | { status: number }> {
    return this.validate(user).then(userData => {
      if (!userData) {
        return { status: 404 };
      }
      const payload = `${userData.name}${userData.id}`;
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600,
        access_token: accessToken,
        user_id: payload,
        status: 200,
      };
    });
  }

  async register(user: User): Promise<any> {
    return this.create(user);
  }
}
