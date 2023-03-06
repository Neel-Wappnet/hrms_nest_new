import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async seed() {
    const users = [
      {
        email: 'superadmin@gmail.com',
        password: await bcrypt.hash('123', 10),
      },
    ];

    for (const user of users) {
      await this.userModel.create(user);
    }
  }
}
