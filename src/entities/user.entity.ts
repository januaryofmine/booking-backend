import { BeforeInsert, Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO, UserRole } from "../common/dto/user.dto"
import { RoomEntity } from "src/entities/room.entity";
import { OrderEntity } from "src/entities/order.entity";

@Entity('user')
export class UserEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @CreateDateColumn()
   createdAt: Date;

   @Index({ fulltext: true })
   @Column({
      type: 'text',
      unique: true
   })
   username: string;

   @Index({ fulltext: true })
   @Column({
      nullable: true ,
      type: 'text',
      unique: true
   })
   name: string;

   @Index({ fulltext: true })
   @Column({ nullable: true , type: 'text'})
   email: string;

   @Index({ fulltext: true })
   @Column('text')
   phone: string;

   @Column('text')
   password: string;

   @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
   role: UserRole;


   @OneToMany(type => RoomEntity, room => room.creator)
   rooms: RoomEntity[];

   @OneToMany(type => OrderEntity, order => order.creator)
   orders: OrderEntity[];

   @BeforeInsert()
   async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
   }

   toResponseObject(showToken: boolean = true): UserRO{
      const {id, createdAt, username, phone,email, token,role} = this;
      const responseObject: any = { id, createdAt, username, phone, email, role};
      if (this.rooms) {
         responseObject.rooms = this.rooms;
      }
      if (this.orders) {
         responseObject.orders = this.orders;
       }
      if(showToken) {
         responseObject.token = token;
      }
      return responseObject;
   }

   async comparePassword(attempt: string) {
      return await bcrypt.compare(attempt, this.password)
   }

   private get token() {
      const {id, username} = this;
      return jwt.sign(
         {
            id,
            username,
         },
         process.env.SECRET,
         {expiresIn: '7d'},
      )
   }
}
