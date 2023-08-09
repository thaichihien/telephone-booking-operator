import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SubscriberService {
  constructor(
    @Inject('SUBSCRIBER_SERVICE_LOCATION')
    private clientLocation: ClientProxy,
    @Inject('SUBSCRIBER_SERVICE_BOOKING')
    private clientBooking: ClientProxy,
  ) {}

  async getHelloMicro(): Promise<any> {
    return this.clientLocation.send({ cmd: 'greeting' }, 'Reception');
  }

  async postMicro(body: any): Promise<any> {
    return this.clientLocation.send({ cmd: 'body' }, body);
  }

  async postMicroBooking(body: any): Promise<any> {
    return this.clientBooking.send({ cmd: 'booking' }, body);
  }

  async getHelloMicroAsync(): Promise<any> {
    const message = await this.clientLocation.send(
      { cmd: 'greeting-async' },
      'Reception',
    );
    return message;
  }

  async publishEvent() {
    this.clientLocation.emit('event', {
      addres: 'Tan Binh',
      name: 'Chi Hien',
    });
  }
}
