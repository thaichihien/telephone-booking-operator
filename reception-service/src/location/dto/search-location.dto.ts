import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SearchDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly address : string
}