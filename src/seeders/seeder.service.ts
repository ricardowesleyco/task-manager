import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoleSeeder } from './entity/roles.seeders';
import { UserSeeder } from './entity/user.seeders';
import { TaskStatusSeeder } from './entity/task-status.seeders';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await RoleSeeder.run(this.dataSource);
    await UserSeeder.run(this.dataSource);
    await TaskStatusSeeder.run(this.dataSource);
  }
}
