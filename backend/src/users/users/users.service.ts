import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/auth/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}
  async findAll(): Promise<Users[]> {
    this.logger.log(`Getting all users`);
    const users = await this.userRepository.find();
    return users.map(({ password, ...user }) => {
      return user;
    });
  }

  async findOne({ id }): Promise<Users> {
    this.logger.log(`Getting user with id: ${id}`);
    const { password, ...user } = await this.userRepository.findOne({
      where: { id: id },
    });
    return user;
  }

  async update(id: number, user: Users) {
    this.logger.log(`Updating user with id: ${id}`);

    const foundUser = await this.findOne({ id });

    // check whether username or email has ben altered
    if (
      foundUser.username !== user.username ||
      foundUser.email !== user.email
    ) {
      throw new UnprocessableEntityException(
        'Username or email should not be edited!',
      );
    }

    // check whether password has ben altered
    if (user.password === null || user.password === undefined) {
      user.password = foundUser.password;
    } else {
      const salt = await bcrypt.genSalt();
      console.log(user.password);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
    return await this.userRepository.update({ id }, user);
  }

  async delete({ id }): Promise<DeleteResult> {
    this.logger.log(`Deleting user with id: ${id}`);
    return await this.userRepository.delete({ id: id });
  }
}
