import { Body, Controller, Get, Post, UsePipes, Request, Param, Query, Logger, UseGuards, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { hasRoles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from 'src/interfaces/users.interfaces';
import { Pagination } from 'src/paginate';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserDTO, UserRole } from '../../common/dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
   constructor(private userService: UserService) { }
   private logger = new Logger('UserController');

   private logData(options: any) {
      options.user && this.logger.log('USER ' + JSON.stringify(options.user));
      options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
      options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
   }


   @Get('api/users')
   async index(@Request() request): Promise<Pagination<UserDTO>> {
      return await this.userService.paginate({
         limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
         page: request.query.hasOwnProperty('page') ? request.query.page : 0,
       });
   }

   @Get('api/users/search')
   showByUser(@Query() query) {
      console.log(query)
      return this.userService.searchUser(query); 
   }
  
   @Get('api/users/:id')
   readUser(@Param('id') id: string){
      return this.userService.readUser(id);
   }

   @Post('api/booking/create/user/role') 
   @UsePipes(new ValidationPipe())
   createUser(@Body() data: UserDTO) {
     return this.userService.create(data);
   }

   // @hasRoles(UserRole.ADMIN)
   // @UseGuards(JwtAuthGuard, RolesGuard)
   // @Put('api/users/:id/role')
   // updateRoleOfUser(@Param('id') id: any, @Body() user: User): Observable<User> {
   //     return this.userService.updateRoleOfUser(id, user);
   // }

   @Post('auth/login')
   @UsePipes(new ValidationPipe())
   login(@Body() data: UserDTO) {
      return this.userService.login(data);
   }

   @Post('auth/register')
   @UsePipes(new ValidationPipe())
   register(@Body() data: UserDTO) {
     return this.userService.register(data);
   }
}
