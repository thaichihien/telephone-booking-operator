import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLocationDto } from './temp.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/greeting')
  async getHelloMicro() {
    return this.appService.testgetHelloMicro();
  }
  @Post('/post')
  async postMicro(@Body() body: CreateLocationDto) {
    return this.appService.testpostMicro(body);
  }
  @Post('/booking')
  async postMicroBooking(@Body() body: CreateLocationDto) {
    return this.appService.testpostMicroBooking(body);
  }

  @Get('/greeting-async')
  async getHelloAsyncMicro() {
    return this.appService.testgetHelloMicroAsync();
  }

  @Get('/publish-event')
  async publishEvent() {
    this.appService.testpublishEvent();
  }
}
