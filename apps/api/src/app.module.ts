import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ProjectsModule } from './projects/projects.module';
import { BlogModule } from './blog/blog.module';
import { ContactModule } from './contact/contact.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProjectsModule, BlogModule, ContactModule, UsersModule],
  providers: [PrismaService],
})
export class AppModule {}

