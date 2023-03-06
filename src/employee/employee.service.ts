import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, employeeDocument } from './schema/employee.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<employeeDocument>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string): Promise<Employee> {
    const findEmployee = await this.employeeModel.findById(id).exec();
    if (!findEmployee) {
      throw new ForbiddenException('Employee not found');
    } else {
      return findEmployee;
    }
  }

  async create(
    createEmployeeDto: CreateEmployeeDto,
    profile: Array<Express.Multer.File>,
    documents: Array<Express.Multer.File>,
  ): Promise<Employee> {
    const docArray = [];
    documents.forEach((img) =>
      docArray.push({ docName: img.originalname, path: img.path }),
    );

    const { email } = createEmployeeDto;
    const findEmployee = await this.employeeModel
      .findOne({
        email,
      })
      .exec();

    if (findEmployee) {
      throw new ForbiddenException('employee already exist');
    } else {
      return await new this.employeeModel({
        ...createEmployeeDto,
        profileImage: profile[0].path,
        documents: docArray,
        createdAt: new Date(),
      }).save();
    }
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
    profile: Array<Express.Multer.File>,
    documents: Array<Express.Multer.File>,
  ): Promise<Employee> {
    const docArray = [];
    documents.forEach((img) =>
      docArray.push({ docName: img.originalname, path: img.path }),
    );

    const findEmployee = await this.employeeModel.findById(id).exec();
    if (!findEmployee) {
      throw new ForbiddenException('Employee not found');
    } else {
      return await this.employeeModel
        .findByIdAndUpdate(id, {
          ...updateEmployeeDto,
          profileImage: profile[0].path,
          documents: docArray,
          updatedAt: new Date(),
        })
        .exec();
    }
  }

  async delete(id: string): Promise<Employee> {
    const findEmployee = await this.employeeModel.findById(id).exec();
    if (!findEmployee) {
      throw new ForbiddenException('Employee not found');
    } else {
      return await this.employeeModel.findByIdAndDelete(id).exec();
    }
  }
}
