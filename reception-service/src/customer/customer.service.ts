import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LocationService } from 'src/location/location.service';

@Injectable()
export class CustomerService {
  constructor(private readonly locationService: LocationService) {}

  create(createCustomerDto: CreateCustomerDto) {
    // - get address, coordiante from address_id


    // - save address to database
    this.locationService.findPlaceAndCreate(createCustomerDto)

    // - send to S3

    // - get result from S3

    return 'This action adds a new customer';
  }
}
