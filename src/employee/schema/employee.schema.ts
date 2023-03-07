import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type employeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({ required: true })
  empCode: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  department: string;

  @Prop()
  role: string;

  @Prop()
  designation: string;

  @Prop()
  birthDate: string;

  @Prop({ default: 'none' })
  profileImage: string;

  @Prop({ default: [] })
  documents: [
    {
      docName: string;
      path: string;
    },
  ];

  @Prop()
  contactNo: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const employeeSchema = SchemaFactory.createForClass(Employee);

employeeSchema.index({ '$**': 'text' });
