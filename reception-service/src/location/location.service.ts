import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { lastValueFrom } from 'rxjs';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

@Injectable()
export class LocationService {
  private index: string;

  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
    private readonly subscriberService: SubscriberService,
  ) {
    this.index = this.configService.get('ELASTIC_INDEX');
  }

  async checkConnection() {
    const info = await this.esService.info();
    return info;
  }

  async createIndex(): Promise<any> {
    const checkIndex = await this.esService.indices.exists({
      index: this.index,
    });

    if (!checkIndex) {
      const result = this.esService.indices.create({
        index: this.index,
        mappings: {
          properties: {
            coordinates: {
              type: 'geo_point',
            },
            address: {
              type: 'text',
              analyzer: 'my_vi_analyzer',
            },
            fullname: {
              type: 'text',
              analyzer: 'my_vi_analyzer',
            },
            phone: {
              type: 'keyword',
            },
            createdAt: {
              type: 'date',
            },
          },
        },
        settings: {
          analysis: {
            analyzer: {
              my_vi_analyzer: {
                type: 'custom',
                tokenizer: 'vi_tokenizer',
                filter: ['lowercase', 'ascii_folding'],
              },
            },
            filter: {
              ascii_folding: {
                type: 'asciifolding',
                preserve_original: true,
              },
            },
          },
        },
      });
      return result;
    } else {
      return {
        message: `index ${this.index} is already existed`,
      };
    }
  }

  async create(createLocationDto: CreateLocationDto) {
    const created = await this.esService.index({
      index: this.index,
      id: createLocationDto.place_id,
      document: createLocationDto,
    });

    return created;
  }

  async findPlaceAndCreate(createCustomerDto: CreateCustomerDto) {
    // -findDetailFromService

    const placeDetail = await this.findDetailFromService(
      createCustomerDto.address_id,
    );

    const createLocationDto: CreateLocationDto = {
      address: placeDetail.address,
      place_id: placeDetail.place_id,
      phone: createCustomerDto.phone,
      fullname: createCustomerDto.name,
      coordinates: {
        lat: placeDetail.coordinate.lat,
        lon: placeDetail.coordinate.long,
      },
    };

    const created = await this.esService.index({
      index: this.index,
      document: createLocationDto,
    });

    return created;
  }

  async findAll() {
    const all = await this.esService.search({
      index: this.index,
      query: {
        match_all: {},
      },
    });

    return all;
  }

  async find(address: string) {
    const result = await this.esService.search({
      index: this.index,
      query: {
        fuzzy: {
          address: address,
        },
      },
    });

    return result;
  }

  async findDetailFromService(placeId: string) {
    const result = await lastValueFrom(
      await this.subscriberService.sendToLocationService('place', placeId),
    );

    const place = result[0];

    const data = {
      place_id: place.place_id,
      address: place.formatted_address,
      coordinate: {
        lat: place.geometry.location.lat,
        long: place.geometry.location.lng,
      },
    };

    return data;
  }

  async findFromService(address: string) {
    const result = await lastValueFrom(
      await this.subscriberService.sendToLocationService('address', address),
    );

    // -- map results
    const predictions = result.map((place) => ({
      address: place.formatted_address,
      place_id: place.place_id,
    }));

    // -- send to client

    return predictions;
  }

  // -- TEST
  async findAllTest() {
    return 'all';
  }

  async findTest(address: string) {
    // const result = await this.esService.search({
    //   index: this.index,
    //   query: {
    //     fuzzy: {
    //       address: address,
    //     },
    //   },
    // });

    return 'result';
  }

  async findFromServiceTest(address: string) {
    const result = await this.subscriberService.sendToLocationService(
      'address',
      address,
    );

    // -- map results
    const placeSuggesstion = result;

    // -- send to client

    return 'result';
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const script = Object.entries(updateLocationDto).reduce(
      (result, [key, value]) => {
        return `${result} ctx._source.${key}='${value}';`;
      },
      '',
    );

    const updated = await this.esService.updateByQuery({
      index: this.index,
      query: {
        ids: {
          values: [id],
        },
      },
      script: script,
    });

    return updated;
  }

  async remove(id: string) {
    this.esService.deleteByQuery({
      index: this.index,
      query: {
        ids: {
          values: [id],
        },
      },
    });
  }

  async removeAll() {
    const deletedAll = await this.esService.indices.delete({
      index: this.index,
    });
    return deletedAll;
  }
}
