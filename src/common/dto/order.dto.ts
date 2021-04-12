import {IsString} from 'class-validator';
import { UserRO } from './user.dto';

export class OrderDTO {
   @IsString()
   userName: string;

   @IsString()
   checkInDate: string;

   @IsString()
   checkOutDate: string;
}

export class OrderRO {
   id: string;
   createdAt: Date;
   updatedAt: Date;
   userName: string;
   checkInDate: string;
   checkOutDate: string;
   creator: UserRO;
}
