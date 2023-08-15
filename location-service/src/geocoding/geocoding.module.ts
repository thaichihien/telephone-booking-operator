import { Module } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';
import { GeocodingController } from './geocoding.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlModule } from 'src/utils/url/url.module';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    UrlModule,
    HttpModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        }),

        // const store = await redisStore({
        //   url: configService.get('REDIS_URL'),
        //   ttl: 6000 * 10,
        // });
        // const client= store.getClient()
        // if(client.isOpen){
        //   await client.connect()
        // }

        // await client.ping()
        // return {
        //   store: () => store,
        // };
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [GeocodingController],
  providers: [GeocodingService],
})
export class GeocodingModule {}
