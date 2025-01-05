import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Req } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-users/:id')
  async getUsers(@Req() req: any, @Res() res: any) {
    return this.appService.getUser(req, res);
  }

  @Post('create-user')
  async createUser(@Req() req: any, @Res() res: any) {
    return this.appService.createUser(req, res);
  }
}
