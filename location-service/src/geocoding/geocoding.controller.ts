import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GeocodingService } from './geocoding.service';
import { CreateGeocodingDto } from './dto/create-geocoding.dto';
import { UpdateGeocodingDto } from './dto/update-geocoding.dto';
import { FindGeocodingDto } from './dto/find-geocoding.dto';

@Controller()
export class GeocodingController {
  constructor(private readonly geocodingService: GeocodingService) {}

  @MessagePattern({ cmd: 'address' })
  search(@Payload() address: string) {
    return this.geocodingService.searchAdress(address)
  }

  @MessagePattern({ cmd: 'place' })
  searchCoordinate(@Payload() placeId: string) {
    return this.geocodingService.findCoordinate(placeId)
  }

  @MessagePattern('createGeocoding')
  create(@Payload() createGeocodingDto: CreateGeocodingDto) {
    return this.geocodingService.create(createGeocodingDto);
  }

  @MessagePattern('findAllGeocoding')
  findAll() {
    return this.geocodingService.findAll();
  }

  @MessagePattern('findOneGeocoding')
  findOne(@Payload() id: number) {
    return this.geocodingService.findOne(id);
  }

  @MessagePattern('updateGeocoding')
  update(@Payload() updateGeocodingDto: UpdateGeocodingDto) {
    return this.geocodingService.update(
      updateGeocodingDto.id,
      updateGeocodingDto,
    );
  }

  @MessagePattern('removeGeocoding')
  remove(@Payload() id: number) {
    return this.geocodingService.remove(id);
  }
}
