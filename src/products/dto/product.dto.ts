import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateCategoryDto } from './category.dto';
import { CreateSubDocDto } from './sub-doc.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @ValidateNested()
  @IsNotEmpty()
  @ApiProperty()
  readonly category: CreateCategoryDto;

  @IsMongoId()
  @IsNotEmpty()
  readonly brand: string;

  @IsNotEmpty()
  @ValidateNested()
  readonly subDoc: CreateSubDocDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  offset: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsNumber()
  @IsPositive()
  maxPrice: number;
}
