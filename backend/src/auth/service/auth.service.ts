import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwt: JwtService,
  ) {}

  async signup(user: Users): Promise<Users> {
    this.logger.log(`Signing up user with username: ${user.username}`);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    const { password, ...saved } = await this.userRepository.save(user);
    return saved;
  }

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.log(`Validating user with username: ${username}`);
    const foundUser = await this.userRepository.findOne({ username });
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { password, ...result } = foundUser;
        return result;
      }

      return null;
    }
    return null;
  }
  async login(user: any) {
    this.logger.log(`Logging in user with username: ${user.username}`);
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      token: this.jwt.sign(payload),
      user,
    };
  }
}
