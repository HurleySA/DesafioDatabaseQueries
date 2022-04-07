import { getRepository, Repository } from 'typeorm';
import { IFindUserByFullNameDTO, IFindUserWithGamesDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';


export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({
      id: user_id,
    },{
      relations: ['games']
    }
    )
    if(!user){ throw new Error("User not found")}

    return user;

  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query('SELECT * FROM "users" order by "first_name"'); 
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query(`SELECT
    *
FROM users AS usuario
WHERE usuario.first_name = '${first_name}' AND usuario.last_name = '${last_name}'`);

  }
}
