import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Skills {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  color: String;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
