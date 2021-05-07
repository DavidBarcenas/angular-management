import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Skills, SkillsSchema } from './skills.entity';

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phone: string;

  @Prop({ type: [SkillsSchema] })
  skills: Types.Array<Skills>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
