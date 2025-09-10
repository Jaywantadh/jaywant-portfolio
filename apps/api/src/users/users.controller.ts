import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Return the first/only user as resume data
  @Get()
  findFirst() {
    return this.usersService.findFirst();
  }
}

