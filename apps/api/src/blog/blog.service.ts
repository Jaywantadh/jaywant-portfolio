import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const posts = await this.prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    return posts.map(p => ({
      ...p,
      tags: JSON.parse(p.tags)
    }));
  }

  async findOne(id: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return {
      ...post,
      tags: JSON.parse(post.tags)
    };
  }
}

