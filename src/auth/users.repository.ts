import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async getUserByUsername(username : string){
    const user : User | null = await this.findOne({
        where: {username: username}
    });
    if (!user){
        throw new NotFoundException();
    }
    return user;
  }

  public async getHashedPassword(plainTextPassword) : Promise<string> {
    try {
      return await bcrypt.hash(plainTextPassword, await bcrypt.genSalt());
    } catch (error) {
      throw new InternalServerErrorException(
        'Network error:/failed to get a hashed password from bcrypt',
      );
    }
  }

  public async createUser(authCredentialsDto: AuthCredentialsDto) : Promise<User> {
    const { username, password } = authCredentialsDto;

    let hashedPassword : string = await this.getHashedPassword(password);
    
    const user: User = this.create({
      username: username,
      password: hashedPassword,
    });

    try {
      return await this.save(user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.code === '23505'
      ) {
        throw new ConflictException('Username already exists!'); //static message is fine for now since we only have one message (will refactor to enum if we need more)
      }
      throw new InternalServerErrorException();
    }
  }
}
