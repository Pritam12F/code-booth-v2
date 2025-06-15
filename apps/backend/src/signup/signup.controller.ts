import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { prisma } from '@workspace/db';

@Controller('signup')
export class SignupController {
  @Post()
  async signUp(@Body() signupDto: SignUpDto) {
    await prisma;
  }
}
