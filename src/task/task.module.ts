import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TaskStatusEntity } from './entities/taskStatus.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, TaskStatusEntity]),
    AuthModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
