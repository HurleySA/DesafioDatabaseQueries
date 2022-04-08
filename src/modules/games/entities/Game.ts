import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Genrer } from '../../genrer/entities/Genrer';
import { Order } from '../../orders/entities/Order';
import { User } from '../../users/entities/User';


@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => User, (user) => user.games)
  users: User[];

  @ManyToMany(() => Genrer, (genrer) => genrer.games)
  @JoinTable()
  genres: Genrer[]

  @ManyToMany(() => Order, (order) => order.games)
  orders: Order[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
