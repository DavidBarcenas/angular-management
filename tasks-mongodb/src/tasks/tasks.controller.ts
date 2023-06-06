import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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
  findById(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }

  @Post()
  create(@Body() task: CreateTaskDto) {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
