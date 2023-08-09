import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Nhận tin theo pattern 'booking' từ Producer
  @MessagePattern({ cmd: 'booking' })
  getData(data: any): string {
    console.log(data);
    return `Ok`;
  }
}
