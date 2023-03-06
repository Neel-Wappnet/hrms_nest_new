import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from 'src/common/helper';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { AtGuard } from 'src/common/guard';
import { Employee } from './schema/employee.schema';

@UseGuards(AtGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profile', maxCount: 1 },
        { name: 'documents', maxCount: 5 },
      ],
      {
        storage: diskStorage({
          destination: `${__dirname}/uploads`,
          filename: Helper.customFileName,
        }),
      },
    ),
  )
  async addEmployee(
    @Body() employee: CreateEmployeeDto,
    @UploadedFiles()
    files: {
      profile: Array<Express.Multer.File>;
      documents: Array<Express.Multer.File>;
    },
  ): Promise<Employee> {
    return this.employeeService.create(
      employee,
      files.profile,
      files.documents,
    );
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Delete('delete/:id')
  async deleteEmployee(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.delete(id);
  }

  @Put('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profile', maxCount: 1 },
        { name: 'documents', maxCount: 5 },
      ],
      {
        storage: diskStorage({
          destination: `${__dirname}/uploads`,
          filename: Helper.customFileName,
        }),
      },
    ),
  )
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFiles()
    files: {
      profile: Array<Express.Multer.File>;
      documents: Array<Express.Multer.File>;
    },
  ): Promise<Employee> {
    return this.employeeService.update(
      id,
      updateEmployeeDto,
      files.profile,
      files.documents,
    );
  }
}
