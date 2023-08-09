import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'greeting' })
  getGreetingMessage(name: string): string {
    console.log(name);
    return `Hello ${name}`;
  }

  @MessagePattern({ cmd: 'body' })
  getData(data: any): string {
    console.log(data);
    return `Ok`;
  }

  @MessagePattern({ cmd: 'greeting-async' })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    console.log(name);
    return `Hello ${name} Async`;
  }

  @EventPattern('event')
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    console.log(data);
  }
}
