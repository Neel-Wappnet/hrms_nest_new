import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { userDocument, User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Token } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<userDocument>,
  ) {}

  async login(dto: AuthDto): Promise<Token> {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new ForbiddenException('Invalid credentials');

    const token = await this.getToken(user.id, user.email);
    return {
      accessToken: token,
    };
  }

  getToken = async (userId: string, email: string): Promise<string> => {
    const token = this.jwtService.sign({
      sub: userId,
      email,
    });

    return token;
  };
}
