import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from './services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async login(data: LoginAuthDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('E-mail invalid or password invalid.');
    }
    return {
      token: await this.jwtService.signAsync({
        user: user.id,
        role: user.role.key,
      }),
      user: { email: user.email, role: user.role.key, name: user.name },
    };
  }
}
