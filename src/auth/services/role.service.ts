import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import RoleEntity from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
  ) {}

  async getById(id: number) {
    return await this.rolesRepository.findOneBy({ id });
  }

  async getByKey(key: string) {
    return await this.rolesRepository.findOneBy({ key });
  }
}
