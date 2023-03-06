import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './auth/schemas';
import { SeederModule } from './db/seeder/seeder.module';
import { SeederService } from './db/seeder/seeder.service';

@Module({
  imports: [
    AuthModule,
    EmployeeModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/hrms_nest_new'),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
    SeederModule,
  ],
  providers: [SeederService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    await this.seederService.seed();
  }
}
