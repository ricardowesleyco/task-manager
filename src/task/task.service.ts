import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { UsersService } from 'src/auth/services/user.service';
import { rolesEnum } from 'src/auth/enums/roles.enum';
import { TaskStatusEntity } from './entities/taskStatus.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(TaskStatusEntity)
    private taskStatusRepository: Repository<TaskStatusEntity>,
    private userService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId) {
    const status = await this.taskStatusRepository.findOneBy({
      key: createTaskDto.status,
    });

    const schema = await this.taskRepository.create({
      description: createTaskDto.description,
      title: createTaskDto.title,
      userId: userId,
      statusId: status.id,
    });
    await this.taskRepository.save(schema);
    return { message: `Task created.` };
  }

  async findAll(user: UserEntity) {
    let whereConditions = {};
    if (this.userService.getRole(user).role.key != rolesEnum.ADMIN) {
      whereConditions = { userId: user.id };
    }
    const result = await this.taskRepository.find({
      where: whereConditions,
      relations: { userEntity: true, status: true },
      select: { userEntity: { name: true }, status: { key: true } },
    });
    if (!result) {
      throw new UnprocessableEntityException('Task not found');
    }
    return result;
  }

  async findOne(id: number, user: UserEntity) {
    let whereConditions: any = { id };
    if (this.userService.getRole(user).role.key != rolesEnum.ADMIN) {
      whereConditions = { id: id, userId: user.id };
    }
    const result = await this.taskRepository.findOne({
      where: whereConditions,
      relations: { userEntity: true, status: true },
      select: { userEntity: { name: true }, status: { key: true } },
    });
    if (!result) {
      throw new UnprocessableEntityException('Task not found');
    }
    return result;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: UserEntity) {
    await this.verifyOwnership(id, user.id);
    const task = await this.taskRepository.findOne({ where: { id: id } });
    const status = await this.taskStatusRepository.findOneBy({
      key: updateTaskDto.status,
    });

    try {
      await this.taskRepository.update(id, {
        description: updateTaskDto.description,
        statusId: status.id,
        title: updateTaskDto.title,
      });
    } catch (error) {
      const errorMessage = error.message || 'Try again later.';
      throw new ConflictException(errorMessage);
    }
    return { message: `Task updated.` };
  }

  async remove(id: number, user: UserEntity) {
    await this.verifyOwnership(id, user.id);
    const task = await this.taskRepository.findOne({ where: { id: id } });
    try {
      await this.taskRepository.delete(id);
    } catch (error) {
      const errorMessage = error.message || 'Try again later.';
      throw new ConflictException(errorMessage);
    }
    return { message: `Task deleted.` };
  }

  async verifyOwnership(taskId: number, userId: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (task.userId != userId) {
      throw new UnauthorizedException(`The task doesn't belong to this user.`);
    }
  }
}
