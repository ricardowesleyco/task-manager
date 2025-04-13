import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from './role.service';
import { rolesEnum } from '../enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly roleServices: RolesService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (
      await this.usersRepository.exists({
        where: { email: createUserDto.email },
      })
    ) {
      throw new ConflictException('E-mail already in use');
    }

    createUserDto.password = await bcrypt
      .hash(createUserDto.password, 10)
      .then((hash) => {
        return hash;
      });
    const role = await this.roleServices.getByKey(rolesEnum.DEFAULT);
    try {
      const schema = await this.usersRepository.create({
        ...createUserDto,
        roleId: role.id,
      });
      await this.usersRepository.save(schema);

      return { message: 'User created.' };
    } catch (error) {
      const errorMessage = error.message || 'Internal Error';
      throw new ConflictException(errorMessage);
    }
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: { role: true },
    });
  }

  async getByUserId(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: { role: true },
    });
  }

  getRole(user: UserEntity) {
    if (!user.role) {
      throw new UnauthorizedException('Role not found.');
    }
    return { role: { key: user.role.key } };
  }
}
