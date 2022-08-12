import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class FilterWorldDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Transform((campaign) => campaign.value.toLowerCase())
  @Transform((campaign) => campaign.value.trim())
  campaign: string
}

export class WorldDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform((campaign) => campaign.value.toLowerCase())
  @Transform((campaign) => campaign.value.trim())
  campaign: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform((campaign) => campaign.value.toLowerCase())
  @Transform((campaign) => campaign.value.trim())
  worldName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform((campaign) => campaign.value.toLowerCase())
  @Transform((campaign) => campaign.value.trim())
  welcome: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  uiid: number

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(9)
  @ValidateNested({ each: true })
  @Type(() => CitiesDto)
  readonly cities: CitiesDto[];
}

class CitiesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform((campaign) => campaign.value.toLowerCase())
  @Transform((campaign) => campaign.value.trim())
  cityName: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  style: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  main: number
  
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(15)
  @Type(() => BuildingsDto)
  readonly buildings: BuildingsDto[];
}

class BuildingsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform((campaign) => campaign.value.toLowerCase())
  @Transform((campaign) => campaign.value.trim())
  buildingName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform((campaign) => campaign.value.toLowerCase())
  @Transform((campaign) => campaign.value.trim())
  description: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform((campaign) => campaign.value.toLowerCase())
  @Transform((campaign) => campaign.value.trim())
  url: string
}




