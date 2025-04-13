import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiResponse } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './services/user.service';
import { AdminOnly } from './decorators/admin-only.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Success.',
    example: { Token: 'token example' },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: ['password should not be empty.', 'password must be a string.'],
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: ['E-mail invalid or password invalid.'],
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: 'User not found.',
    },
  })
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Public()
  @Post('/user')
  @ApiResponse({
    status: 201,
    description: 'Success.',
    example: { message: 'User created.' },
  })
  @ApiResponse({
    status: 409,
    description: 'E-mail already in use.',
    example: {
      message: 'E-mail already in use.',
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('/role')
  async getUserRole(@GetUser() user, @AdminOnly() allow) {
    return await this.usersService.getRole(user);
  }
}
