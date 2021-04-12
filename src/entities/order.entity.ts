import { UserEntity } from "src/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('order')
export class OrderEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @Column('text')
   userName: string;

   @Column({ nullable: true , type: 'text'})
   checkInDate: string;

   @Column({ nullable: true , type: 'text'})
   checkOutDate: string;

   @ManyToOne(type => UserEntity, creator => creator.rooms)
   creator: UserEntity
}
