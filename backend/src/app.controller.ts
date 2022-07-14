import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MailData } from './mail.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() body): string {
    console.log(body);
    return this.appService.getHello();
  }

  @Get('mailTo')
  mailTo(@Query() mailData:MailData){
    this.appService.mailTo(mailData);
  }
}
