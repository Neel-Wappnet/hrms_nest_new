import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum ActiveStatus {
  active = 'Active',
  inActive = 'InActive',
  deleted = 'Deleted',
}

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  createdAt: Date;

  @Prop({ default: ActiveStatus.active })
  activeStatus: ActiveStatus;
}

export const userSchema = SchemaFactory.createForClass(User);
