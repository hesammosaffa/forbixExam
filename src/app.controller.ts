import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-users/:id')
  async getUsers(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.appService.getUser(id);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Post('create-user')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.appService.createUser(createUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Delete('delete-user/:id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.appService.deleteUser(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Put('update-user/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
    @Res() res: Response,
  ) {
    try {
      const user = await this.appService.updateUser(id, updateUserDto);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Get('get-all-users')
  async getAllUsers(@Res() res: Response) {
    try {
      const users = await this.appService.getAllUsers();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
