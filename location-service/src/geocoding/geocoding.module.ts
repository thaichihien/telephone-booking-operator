import { Module } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';
import { GeocodingController } from './geocoding.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          url: configService.get('REDIS_URL'),
          ttl: 6000 * 10,
        });
        return {
          store: () => store,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [GeocodingController],
  providers: [GeocodingService],
})
export class GeocodingModule {}
