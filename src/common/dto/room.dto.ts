import {IsString, IsNumber, IsBoolean} from 'class-validator'
import { UserRO } from './user.dto';

export class RoomDTO {
   @IsString()
   roomType: string

   @IsNumber()
   numberOfBed: number;

   @IsNumber()
   numberOfPerson: number;

   @IsNumber()
   roomSize: number;

   @IsBoolean()
   airConditioning: boolean;
   
   @IsBoolean()
   freeWiFi: boolean;
} 

export class RoomRO {
   id: string;
   created: Date;
   updated: Date;
   roomType: string;
   numberOfBed: number;
   numberOfPerson: number;
   roomSize: number;
   airConditioning: boolean;
   freeWiFi: boolean;
   creator: UserRO;
 }
