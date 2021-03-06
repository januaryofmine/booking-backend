import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { OrderController } from './order.controller';
import { OrderEntity } from '../../entities/order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
