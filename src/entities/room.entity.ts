import { UserEntity } from 'src/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('room')
export class RoomEntity {
   @PrimaryGeneratedColumn('uuid') 
   id: string;

   @CreateDateColumn() 
   created: Date;

   @UpdateDateColumn()
   updated: Date;

   @Column('text') 
   roomType: string;

   @Column({ nullable: true , type: 'text'})
   photoUrl: string;

   @Column('int') 
   numberOfBed: number;

   @Column('int') 
   numberOfPerson: number;

   @Column('int') 
   roomSize: number;

   @Column('boolean') 
   airConditioning: boolean;

   @Column('boolean') 
   freeWiFi: boolean;

   @ManyToOne(type => UserEntity, creator => creator.rooms)
   creator: UserEntity;
}
