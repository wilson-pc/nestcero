import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    const hash = bcrypt.hashSync(createUserDto.password, 8);
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        username: createUserDto.username,
        email: createUserDto.email,
        password: hash,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: { name: true, username: true, email: true, id: true },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: {
        name: updateUserDto.name,
        username: updateUserDto.username,
        email: updateUserDto.email,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
