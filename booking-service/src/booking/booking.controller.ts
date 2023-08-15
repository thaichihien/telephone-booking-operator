import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateRideDto } from './dtos/create-ride.dto';
import { UpdateRideDto } from './dtos/update-ride.dto';

@ApiTags('booking')
@Controller('booking')
export class BookingController {

    constructor(private bookingService: BookingService){}

    // CREATE NEW RIDE
    @ApiOperation({ summary: "Create a new ride" })
    @ApiBody({ type: CreateRideDto })
    @Post()
    async createADriver(@Body() rideCreateDto: CreateRideDto) {
        return await this.bookingService.createNewRide(rideCreateDto);
    }

    @ApiOperation({ summary: "Get all trip" })
    @Get()
    async getAllDriver() {
        return await this.bookingService.getAllTrip();
    }

    // GET RIDE BY ID
    @ApiOperation({ summary: "Find an trip by ID" })
    @ApiResponse({ status: 201, description: "Trip found!" })
    @ApiParam({ name: 'id', type: 'string' })
    @Get(':id')
    async getDriverById(@Param('id') id: string) {
        return await this.bookingService.getTripById(id);
    }

    // UPDATE A DRIVER
    @ApiOperation({ summary: "Update a trip" })
    @ApiBody({ type: UpdateRideDto })
    @Put(':id')
    async updateADriver(@Param('id') id: string, @Body() rideUpdateDto: UpdateRideDto) {
        return await this.bookingService.updateRideById(id, rideUpdateDto);
    }

}
