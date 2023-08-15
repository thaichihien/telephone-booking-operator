import { Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRideDto } from './dtos/create-ride.dto';
import { UpdateRideDto } from './dtos/update-ride.dto';

@Injectable()
export class BookingService {
    constructor (
        private readonly prismaService: PrismaService
    ) {}

    async createNewRide(createRideDto: CreateRideDto): Promise<Trip | [] > {
        
        const {pickup_address, name, phone, seat_number, driver_id, status} = createRideDto;

        const driverExists = await this.prismaService.driver.findFirst({
            where: {
                OR: [
                    { id: driver_id}
                ]
            }
        });

        if (!driverExists){
            throw new NotFoundException("driver not found");
        }

        const newRide = await this.prismaService.trip.create({
            data: {
                driverID: driver_id,
                source: pickup_address,
                riderName: name, 
                total_seat: seat_number,
                riderPhone: phone,
                status: status
            }
        });

        return newRide;
    }

    async getAllTrip(): Promise<Trip [] | []> {
        return this.prismaService.trip.findMany();        
    }

    async getTripById(id: string): Promise<Trip | null > {
        const tripExists: Trip = await this.prismaService.trip.findUnique({
            where: { id },
        });

        if (!tripExists) {
            throw new NotFoundException("Trip not found!");
        }

        return await this.prismaService.trip.findUnique({ where: { id } });    
    }

    async updateRideById(id: string, updateRideDto: UpdateRideDto): Promise<Trip | [] > {
        
        
        const tripExists = await this.prismaService.trip.findUnique({ where: { id } });
        const {status, source, destination, date, rider_id, name, phone, seat_number, driver_id, trip_cost, trip_length, paymentID} = updateRideDto;

        if (!tripExists){
            throw new NotFoundException("trip not found");
        }

        const updated_ride = await this.prismaService.trip.update({
            where: {id}, data: {
                status: status,
                source: source,
                destination: destination,
                date: date,
                riderID: rider_id,
                riderName: name,
                riderPhone: phone,                 
                driverID: driver_id,
                trip_length: trip_length,
                trip_cost: trip_cost,
                total_seat: seat_number,
                paymentID: paymentID
            }
        });

        return updated_ride;
    }
}
