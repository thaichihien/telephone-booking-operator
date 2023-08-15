import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from "@nestjs/class-validator";

export class UpdateRideDto {


    @ApiProperty({ example: "Waiting" })
    @IsString()
    readonly status: string;

    @ApiProperty({ example: '235 Nguyen Van cu' })
    @IsString()
    readonly source: string;

    @ApiProperty()
    @IsString()    
    @IsOptional()
    readonly destination: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly date: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly name: string;

    @ApiProperty({ example: '+8498172689' })
    @IsString()
    @IsOptional()
    @Matches(/^\+[1-9]\d{1,14}$/)
    readonly phone: string;
  
    @ApiProperty({ example: 'acba-zcxz-123a' })
    @IsString()
    @IsNotEmpty()  
    @IsOptional()  
    readonly rider_id: string;

    @ApiProperty({ example: 'acba-zcxz-123a' })
    @IsString()
    @IsNotEmpty()    
    @IsOptional()
    readonly driver_id: string;
  
    @ApiProperty({ example: '3.5' })
    @IsString()
    @IsOptional()
    @IsNotEmpty()    
    readonly trip_length: number;
  
    @ApiProperty({ example: '1200' })
    @IsString()
    @IsOptional()
    @IsNotEmpty()    
    readonly trip_cost: number;
  
    @ApiProperty({ example: 7})    
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    readonly seat_number: number;

    @ApiProperty({ example: "abcd-xyzy-123ac" })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly paymentID: string;


}