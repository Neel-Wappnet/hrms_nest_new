import { IsEmail, IsString, Length } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  empCode: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  department: string;

  @IsString()
  role: string;

  @IsString()
  designation: string;

  @IsString()
  birthDate: string;

  @IsString()
  @Length(10, 10)
  contactNo: string;
}

export class UploadEmployeeDto extends CreateEmployeeDto {}
