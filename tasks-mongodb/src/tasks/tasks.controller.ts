import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('tasks-mongodb')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findById(id: string) {
    return this.tasksService.findById(id);
  }

  @Post()
  create(task: CreateTaskDto) {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(id: string, task: UpdateTaskDto) {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  delete(id: string) {
    return this.tasksService.delete(id);
  }
}
