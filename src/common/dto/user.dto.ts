import {IsNotEmpty, IsString} from 'class-validator'
import { OrderEntity } from 'src/entities/order.entity';
import { RoomEntity } from 'src/entities/room.entity';

export class UserDTO {
   @IsNotEmpty()
   username: string;

   @IsString()
   email: string;

   @IsString()
   phone: string;
   
   @IsString()
   name: string;

   @IsNotEmpty()
   password: string;
}

export class UserRO {
   id: string;
   username: string;
   name: string;
   email?: string;
   createdAt: Date;
   token ?: string;
   rooms?: RoomEntity;
   orders?: OrderEntity;
   role?: UserRole;
}


export enum UserRole {
   ADMIN = 'admin',
   USER = 'user'
} 
