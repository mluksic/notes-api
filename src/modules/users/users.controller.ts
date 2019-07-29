import { Controller, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('login')
  async login(@Body() user: User): Promise<any> {
    return this.userService.login(user);
  }

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.userService.register(user);
  }
}
