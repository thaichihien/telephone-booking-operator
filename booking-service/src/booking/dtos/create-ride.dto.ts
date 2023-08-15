import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from "@nestjs/class-validator";

export class CreateRideDto {

    @ApiProperty({ example: '+8498172689' })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+[1-9]\d{1,14}$/)
    readonly phone: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
  
    @ApiProperty({ example: '235 Nguyen Van cu' })
    @IsString()
    @IsNotEmpty()
    readonly pickup_address: string;
  
    @ApiProperty({ example: 7})    
    @IsNotEmpty()
    @IsNumber()
    readonly seat_number: number;

    @ApiProperty({ example: "abcd-xyzy-123ac" })
    @IsString()
    @IsNotEmpty()
    readonly driver_id: string;

    @ApiProperty({ example: "Waiting" })
    @IsString()
    @IsNotEmpty()
    readonly status: string;
}