import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const task = await this.tasksService.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Post()
  async create(@Body() task: CreateTaskDto) {
    try {
      return await this.tasksService.create(task);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists');
      }
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    const oldTask = await this.tasksService.update(id, task);
    if (!oldTask) throw new NotFoundException('Task not found');
    return task;
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const task = await this.tasksService.delete(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
