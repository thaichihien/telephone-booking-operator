import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  create(createCustomerDto: CreateCustomerDto) {
    
    // - get address, coordiante from address_id

    // - save address to database

    // - send to S3


    // - get result from S3

    return 'This action adds a new customer';
  }

  
}
