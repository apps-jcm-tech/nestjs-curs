import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialsDto } from './types/auth-credantials.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  signUp(@Body() authCreationDto: AuthCredentialsDto): Promise<void> {
    return this.userService.signUp(authCreationDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCreationDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCreationDto);
  }
}
