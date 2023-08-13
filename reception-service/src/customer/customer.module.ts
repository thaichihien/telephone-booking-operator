import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [LocationModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
