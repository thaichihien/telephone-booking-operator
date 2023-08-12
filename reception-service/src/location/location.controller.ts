import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Search Address')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: 'Check elasticsearch connect' })
  @Get()
  checkConnection() {
    return this.locationService.checkConnection();
  }

  @ApiOperation({ summary: 'add a address to history' })
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @ApiOperation({ summary: 'get all address from history' })
  @Get('all')
  findAll() {
    return this.locationService.findAll();
  }

  @ApiOperation({ summary: 'search address from history' })
  @Get('search')
  findOne(@Query('address') address: string) {
    return this.locationService.find(address);
  }

  @ApiOperation({ summary: 'search address from google api' })
  @Get('search-api')
  findOneByAPI(@Query('address') address: string) {
    return this.locationService.find(address);
  }

  // - TEST

  @ApiOperation({ summary: 'get all address from history (test)' })
  @Get('all')
  findAllTest() {
    return this.locationService.findAllTest();
  }

  @ApiOperation({ summary: 'search address from history (test)' })
  @Get('search')
  findOneTest(@Query('address') address: string) {
    return this.locationService.findTest(address);
  }

  @ApiOperation({ summary: 'search address from google api (test)' })
  @Get('search-api')
  findOneByAPITest(@Query('address') address: string) {
    return this.locationService.findFromServiceTest(address);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }

  @Get('index')
  createIndex() {
    return this.locationService.createIndex();
  }
}
