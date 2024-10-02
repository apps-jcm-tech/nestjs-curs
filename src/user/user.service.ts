import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './types/auth-credantials.dto';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from './types/jwt-payload';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async signIn(
    authCreationDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCreationDto;

    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JWTPayload = { username };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async signUp(authCreationDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCreationDto);
  }
}
