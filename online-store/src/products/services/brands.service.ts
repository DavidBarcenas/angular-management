import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Brand } from 'src/products/entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dto/brand.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll() {
    return {
      brands: await this.brandModel.find().exec(),
    };
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = new this.brandModel(payload);
    return newBrand.save();
  }

  update(id: string, payload: UpdateBrandDto) {
    const brand = this.brandModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    return brand;
  }

  delete(id: string) {
    return this.brandModel.findByIdAndDelete(id);
  }
}
