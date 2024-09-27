import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { updateuserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async create(createuserDto: CreateUserDto) {
    const existinguser = await this.prisma.user.findFirst({
      where: { username: createuserDto.username }
    });
    if (existinguser) {
      throw new ConflictException('User already exists..');
    }

    const hashedPassword = await bcrypt.hash(createuserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: createuserDto.username,
        email: createuserDto.email,
        password: hashedPassword,
        city: createuserDto.city,
        dob: createuserDto.dob,
      },
    });

    return {
      message: 'Record successfully inserted', user,
    };
  }
  async findAll() {
    return this.prisma.user.findMany({
    });

  }

  async findOne(username: string) {
    return this.prisma.user.findFirst({
      where: { username: username }
    });
  }

  async update(id: string, updateuserDto: updateuserDto) {
    const hashedPassword = await bcrypt.hash(updateuserDto.password, 10)
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        username: updateuserDto.username,
        email: updateuserDto.email,
        dob: updateuserDto.dob,
        password: hashedPassword,
      }
    });
    return {
      message: 'Record successfully updated', user
    }
  }
  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return {
      message: 'Record successfully deleted', user,
    };
  }
}



