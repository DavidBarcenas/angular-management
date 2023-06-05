import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

  findAll() {
    return this.taskModel.find();
  }

  async findById(id: string) {
    return this.taskModel.findById(id);
  }

  async create(task: Task) {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async update(id: string, task: Task) {
    return this.taskModel.findByIdAndUpdate(id, task);
  }

  async delete(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
