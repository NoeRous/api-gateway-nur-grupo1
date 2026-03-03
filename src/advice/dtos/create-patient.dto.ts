import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsObject,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

export enum BodyComposition {
  NORMAL = 'Normal',
  OVERWEIGHT = 'Overweight',
  OBESE = 'Obese',
  UNDERWEIGHT = 'Underweight',
}

class LocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  identityCard: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  cellPhone: string;

  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsNumber()
  @IsPositive()
  weight: number;

  @IsNumber()
  @IsPositive()
  height: number;

  @IsEnum(BodyComposition)
  bodyComposition: BodyComposition;
}