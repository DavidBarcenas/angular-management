import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubDocDto {
  @IsString()
  @IsNotEmpty()
  readonly name: String;

  @IsString()
  @IsNotEmpty()
  readonly description: String;
}

export class UpdateSubDocDto extends PartialType(CreateSubDocDto) {}
