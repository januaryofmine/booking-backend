import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { OrderDTO, OrderRO } from '../../common/dto/order.dto';
import { OrderEntity } from '../../entities/order.entity';

@Injectable()
export class OrderService {
   constructor(
      @InjectRepository(OrderEntity)     
      private orderRepository:  Repository<OrderEntity>,
      @InjectRepository(UserEntity)
      private userRepository: Repository<UserEntity>,
    ) {}

    private orderToResponseObject(order: OrderEntity): OrderRO {
      return {
         ...order,
         creator: order.creator ? order.creator.toResponseObject(false) : null,
      };
   }

   private ensureOwnership(order: OrderEntity, userId: string) {
      if (order.creator.id !== userId) {
        throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
      }
   }


   async getListOrder(): Promise<OrderRO[]> {
      const order = this.orderRepository.find({ relations: ['creator'] });
      return (await order).map(order => this.orderToResponseObject(order))   
   }


   async read(id : string): Promise<OrderRO> {
      const order = await this.orderRepository.findOne({
         where: { id },
         relations: ['creator'],
      });
      if(!order) {
         throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }
      return this.orderToResponseObject(order);
   }

   // async searchRoom(keyword: SearchRoom) {
   //    const [result, total] = await this.roomRepository.findAndCount(
   //       {
   //          where:[ 
   //             { 
   //                roomType: Raw(alias => `LOWER(${alias}) Like '%${keyword.roomType.toLowerCase()}%'`) 
   //             },
   //       ],
   //          take: Number(keyword.take),
   //          skip: Number(keyword.skip)
   //       }
   //    );
   //    if(!result) {
   //       throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
   //    }

   //    return {
   //       data: result,
   //       count: total
   //    }
   // }

   async create(userId: string ,data: OrderDTO): Promise<OrderRO>{
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const order = await this.orderRepository.create({...data, creator: user});
      await this.orderRepository.save(order);
      return this.orderToResponseObject(order);
   }

   async update(id: string, userId: string ,data: Partial<OrderDTO>): Promise<OrderRO> {
      const order = await this.orderRepository.findOne({
         where: { id },
         relations: ['creator'],
       });
      if(!order) {
         throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      this.ensureOwnership(order, userId);
      await this.orderRepository.update({id}, data);
      return this.orderToResponseObject(order);
   }

   async destroy(id: string, userId: string): Promise<OrderRO> {
      const order = await this.orderRepository.findOne({
         where: { id },
         relations: ['creator'],
       });
      if(!order) {
         throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      this.ensureOwnership(order, userId);
      await this.orderRepository.remove(order);
      return this.orderToResponseObject(order);
   }
}
