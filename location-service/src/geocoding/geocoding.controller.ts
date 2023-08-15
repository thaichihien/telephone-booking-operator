import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GeocodingService } from './geocoding.service';
import { CreateGeocodingDto } from './dto/create-geocoding.dto';
import { UpdateGeocodingDto } from './dto/update-geocoding.dto';
import { FindGeocodingDto } from './dto/find-geocoding.dto';

@Controller('test')
export class GeocodingController {
  constructor(private readonly geocodingService: GeocodingService) {}

  @MessagePattern({ cmd: 'address' })
  search(@Payload() address: string) {
    return this.geocodingService.searchAdress(address);
  }

  @MessagePattern({ cmd: 'place' })
  searchCoordinate(@Payload() placeId: string) {
    return this.geocodingService.findCoordinate(placeId);
  }

  // @Get('')
  // testRedisConnect(@Param() placeId: string) {
  //   return "Ok";
  // }

  // @Get(':id')
  // testRedis(@Param('id') placeId: string) {
  //   console.log(placeId);
  //   return this.geocodingService.testRedis(placeId);
  // }


}
