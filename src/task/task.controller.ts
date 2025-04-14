import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user) {
    return this.taskService.create(createTaskDto, user.id);
  }

  @Get()
  findAll(@GetUser() user) {
    return this.taskService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user) {
    return this.taskService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user,
  ) {
    return this.taskService.update(+id, updateTaskDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user) {
    return this.taskService.remove(+id, user);
  }
}
