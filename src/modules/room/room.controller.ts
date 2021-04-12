import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { RoomDTO } from '../../common/dto/room.dto';
import { AuthGuard } from '../../shared/auth.gaurd';
import { ValidationPipe } from '../../shared/validation.pipe';
import { User } from '../user/user.decorator';
import { RoomService } from './room.service';

@Controller('api/room')
export class RoomController {
   private logger = new Logger('RoomController');

   constructor(private roomService: RoomService) {}

   private logData(options: any) {
      options.user && this.logger.log('USER ' + JSON.stringify(options.user));
      options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
      options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
   }

   @Get()
   getListRoom(){
      return this.roomService.getListRoom();
   }

   @Get('/search')
   showSearchRoom(@Query() query) {
      return this.roomService.searchRoom(query);
   }

   @Post()
   @UseGuards(new AuthGuard())
   @UsePipes(new ValidationPipe())
   createRoom(@User('id') user, @Body() body: RoomDTO){
      this.logData({user, body})
      return this.roomService.create(user, body);
   }

   @Get(':id')
   readRoom(@Param('id') id: string){
      this.logData({ id })
      return this.roomService.read(id);
   }

   @Put(':id')
   @UseGuards(new AuthGuard())
   @UsePipes(new ValidationPipe())
   updateRoom(
      @Param('id') id: string, 
      @User('id') user,
      @Body() body: Partial<RoomDTO>
      ){
      this.logData({ id, user, body });
      return this.roomService.update(id, user, body)
   }

   @Delete(':id')
   @UseGuards(new AuthGuard())
   destroyRoom(@Param('id') id: string,@User('id') user) {
      this.logData({id, user})
      return this.roomService.destroy(id, user)
   }
}
