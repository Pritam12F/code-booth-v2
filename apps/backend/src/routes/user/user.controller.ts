import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async fetchAllUsers(@Query('email') email: string) {
    try {
      return await this.userService.fetchAllUsersEmails(email);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Could not fetch users',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: err,
        },
      );
    }
  }

  @Post('signup')
  async signUp(@Body() signupDto: SignUpDto) {
    try {
      await this.userService.signUp(signupDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Could not signup user',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
