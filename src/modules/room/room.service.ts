import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRO, RoomDTO } from '../../common/dto/room.dto';
import { RoomEntity } from 'src/entities/room.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository, Raw } from 'typeorm';
import { SearchRoom } from 'src/interfaces/room.interfaces';


@Injectable()
export class RoomService {
   constructor(
      @InjectRepository(RoomEntity)     
      private roomRepository:  Repository<RoomEntity>,
      @InjectRepository(UserEntity)
      private userRepository: Repository<UserEntity>,
    ) {}
   private roomToResponseObject(room: RoomEntity): RoomRO {
      return {
         ...room,
         creator: room.creator ? room.creator.toResponseObject(false) : null,
      };
   }

   private ensureOwnership(room: RoomEntity, userId: string) {
      if (room.creator.id !== userId) {
        throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
      }
   }


   async getListRoom(): Promise<RoomRO[]> {
      const rooms = this.roomRepository.find({ relations: ['creator'] });
      return (await rooms).map(room => this.roomToResponseObject(room))   
   }


   async read(id : string): Promise<RoomRO> {
      const room = await this.roomRepository.findOne({
         where: { id },
         relations: ['creator'],
      });
      if(!room) {
         throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }
      return this.roomToResponseObject(room);
   }

   async searchRoom(keyword: SearchRoom) {
      const [result, total] = await this.roomRepository.findAndCount(
         {
            where:[ 
               { 
                  roomType: Raw(alias => `LOWER(${alias}) Like '%${keyword.roomType.toLowerCase()}%'`) 
               },
         ],
            take: Number(keyword.take),
            skip: Number(keyword.skip)
         }
      );
      if(!result) {
         throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return {
         data: result,
         count: total
      }
   }

   async create(userId: string ,data: RoomDTO): Promise<RoomRO>{
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const room = await this.roomRepository.create({...data, creator: user});
      await this.roomRepository.save(room);
      return this.roomToResponseObject(room);
   }

   async update(id: string, userId: string ,data: Partial<RoomDTO>): Promise<RoomRO> {
      const room = await this.roomRepository.findOne({
         where: { id },
         relations: ['creator'],
       });
      if(!room) {
         throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      this.ensureOwnership(room, userId);
      await this.roomRepository.update({id}, data);
      return this.roomToResponseObject(room);
   }

   async destroy(id: string, userId: string): Promise<RoomRO> {
      const room = await this.roomRepository.findOne({
         where: { id },
         relations: ['creator'],
       });
      if(!room) {
         throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      this.ensureOwnership(room, userId);
      await this.roomRepository.remove(room);
      return this.roomToResponseObject(room);
   }
}
