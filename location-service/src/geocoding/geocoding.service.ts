import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGeocodingDto } from './dto/create-geocoding.dto';
import { UpdateGeocodingDto } from './dto/update-geocoding.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class GeocodingService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createGeocodingDto: CreateGeocodingDto) {
    return 'This action adds a new geocoding';
  }

  async searchAdress(address: string) {
    const { data } = await firstValueFrom(
      this.httpService.get('').pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(
            'get address server error : ' + error,
          );
        }),
      ),
    );

    for (let index = 0; index < data.results.length; index++) {
      const place = data.results[index];
      await this.cacheService.set(place.place_id, place);
    }

    return data.results;
  }

  async findCoordinate(placeId: string) {
    const place = await this.cacheService.get(placeId);
    if (place) {
      console.log('get from cache');
      return place;
    }

    const { data } = await firstValueFrom(
      this.httpService.get('').pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(
            'get address server error : ' + error,
          );
        }),
      ),
    );

    const searchPlace = data.results[0];
    await this.cacheService.set(searchPlace.place_id, searchPlace);

    console.log("get from api");
    return searchPlace;
  }

  findAll() {
    return `This action returns all geocoding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geocoding`;
  }

  update(id: number, updateGeocodingDto: UpdateGeocodingDto) {
    return `This action updates a #${id} geocoding`;
  }

  remove(id: number) {
    return `This action removes a #${id} geocoding`;
  }
}
