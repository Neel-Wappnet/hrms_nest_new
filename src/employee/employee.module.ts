import { ForbiddenException, Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, employeeSchema } from './schema/employee.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: employeeSchema,
      },
    ]),
    MulterModule.register({
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/.(jpg|jpeg|png|pdf)$/)) {
          return cb(
            new ForbiddenException('please upload file in image or pdf format'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  ],
})
export class EmployeeModule {}
