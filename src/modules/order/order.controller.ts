import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from 'src/modules/user/user.decorator';
import { OrderDTO } from '../../common/dto/order.dto';
import { OrderService } from './order.service';

@Controller('api/order')
export class OrderController {
   private logger = new Logger('OrderController');

   constructor(private orderService: OrderService) {}

   private logData(options: any) {
      options.user && this.logger.log('USER ' + JSON.stringify(options.user));
      options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
      options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
   }

   @Get()
   getListOrder() {
      return this.orderService.getListOrder()
   }

 
   @Get(':id')
   readOrder(@Param('id') id: string) {
      this.logData({id});
      return this.orderService.read(id);
   }

   @Post()
   @UseGuards(new AuthGuard())
   @UsePipes(new ValidationPipe())
   createOrder(@User('id') user, @Body() body: OrderDTO) {
      this.logData({user, body});
      return this.orderService.create(user, body);
   }


   @Put(':id')
   @UseGuards(new AuthGuard())
   @UsePipes(new ValidationPipe())
   updateOrder(
      @Param('id') id: string,
      @User('id') user,
      @Body() body: Partial<OrderDTO>
   ) {
      this.logData({ id, user, body });
      return this.orderService.update(id, user, body);
   }

   @Delete(':id')
   @UseGuards(new AuthGuard())
   destroyOrder(@Param('id') id: string, @User('id') user) {
      this.logData({id, user});
      return this.orderService.destroy(id, user);
   }
}
