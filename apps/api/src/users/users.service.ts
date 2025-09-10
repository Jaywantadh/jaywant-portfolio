import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findFirst() {
    const user = await this.prisma.user.findFirst();
    if (!user) return null;
    return {
      ...user,
      skills: JSON.parse(user.skills)
    };
  }
}

