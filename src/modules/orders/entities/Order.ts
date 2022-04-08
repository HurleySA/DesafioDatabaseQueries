import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Game } from '../../games/entities/Game';
import { User } from '../../users/entities/User';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Game, (game) => game.orders)
  @JoinTable()
  games: Game[];

  @ManyToMany(() => User, (user) => user.orders)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
