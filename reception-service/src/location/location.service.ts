import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { SubscriberService } from 'src/subscriber/subscriber.service';

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

  async findFromService(address: string) {
    const result = await this.subscriberService.sendToLocationService(
      'address',
      address,
    );

    // -- map results

    // -- send to client

    return;
  }

  // -- TEST
  async findAllTest() {
   

    return "all";
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

    return "result";
  }

  async findFromServiceTest(address: string) {
    const result = await this.subscriberService.sendToLocationService(
      'address',
      address,
    );

    // -- map results

    // -- send to client

    return "result";
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
