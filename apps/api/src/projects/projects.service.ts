import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const projects = await this.prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    return projects.map(p => ({
      ...p,
      techStack: JSON.parse(p.techStack)
    }));
  }
}

