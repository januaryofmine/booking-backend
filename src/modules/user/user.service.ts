import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SearchUser, User } from 'src/interfaces/users.interfaces';
import { Pagination, PaginationOptionsInterface } from 'src/paginate';
import { Repository, Like, Raw } from 'typeorm';
import { UserDTO, UserRO } from '../../common/dto/user.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(UserEntity)
      private userRepository: Repository<UserEntity>,
   ) {}


   async paginate(
      options: PaginationOptionsInterface,
   ) : Promise<Pagination<UserDTO>> {
      const [results, total] = await this.userRepository.findAndCount({
         take: options.limit,
         skip: options.page,
         relations: ['rooms', 'orders'] ,
         select: ['id','username','createdAt','phone', 'email','role'],
      });

      return new  Pagination<UserDTO>({
         results,
         total,
      })
   }

   findOne(id: string): Observable<User> {
      return from(this.userRepository.findOne({id})).pipe(
          map((user: User) => {
              const {password, ...result} = user;
              return result;
          } )
      )
  }

   async readUser(id : string) {
      const user = await this.userRepository.findOne({
         where: { id }
      });
      if(!user) {
         throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }
      return user;
   }

   async searchUser(keyword: SearchUser) {
      const [result, total] = await this.userRepository.findAndCount(
         {
            where:
               { 
                  username: Raw(alias => `LOWER(${alias}) Like '%${keyword.username.toLowerCase()}%'`),
                  phone: Like(`%${keyword.phone}%`),
                  email: Raw(alias => `${alias} Like '%${keyword.email}%'`) 
               } 
         ,
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


   async create(data: UserDTO): Promise<UserRO> {
      const {username} = data;
      let user = await this.userRepository.findOne({where: {username}});
      if(user) {
         throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      user = await this.userRepository.create(data);
      await this.userRepository.save(user);
      return user.toResponseObject()
  }


   updateRoleOfUser(id: string, user: User): Observable<any> {
      return from(this.userRepository.update(id, user));
   }

   async login(data: UserDTO): Promise<UserRO> {
      const {username, password} = data;
      const user = await this.userRepository.findOne({where: {username}});
      if(!user || !(await user.comparePassword(password))) {
         throw new HttpException(
            'Invalid username/password',
            HttpStatus.BAD_REQUEST,
         )
      }
      return user.toResponseObject();
   }

   async register(data: UserDTO): Promise<UserRO> {
      const {username} = data;
      let user = await this.userRepository.findOne({where: {username}});
      if(user) {
         throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      user = await this.userRepository.create(data);
      await this.userRepository.save(user);
      return user.toResponseObject()
   }
}
