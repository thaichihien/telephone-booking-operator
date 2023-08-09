import { Injectable } from '@nestjs/common';
import { SubscriberService } from './subscriber/subscriber.service';

@Injectable()
export class AppService {

  constructor(
    private readonly subscriberService : SubscriberService
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  async testgetHelloMicro() : Promise<any> {
    return this.subscriberService.getHelloMicro();
  }

  async testpostMicro(body : any) : Promise<any>  {
    return this.subscriberService.postMicro(body)
  }

  async testpostMicroBooking(body : any) : Promise<any>  {
    return this.subscriberService.postMicroBooking(body)
  }

  async testgetHelloMicroAsync() : Promise<any>  {
    const message = this.subscriberService.getHelloMicroAsync()
    return message;
  }

  async testpublishEvent() {
    this.subscriberService.publishEvent()
    return {message : "publish success"}
  }
}
