import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule} from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SubscriberModule } from './subscriber/subscriber.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SubscriberModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
