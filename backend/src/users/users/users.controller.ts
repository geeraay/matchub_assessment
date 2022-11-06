import {
  Controller,
  UseGuards,
  Get,
  Param,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Users } from 'src/auth/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<Users> {
    return this.usersService.findOne({ id });
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() user: Users,
  ): Promise<UpdateResult> {
    return this.usersService.update(id, user);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.usersService.delete({ id });
  }
}
