import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCandidateDto } from 'src/candidates/dto/create-candidate.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createCandidateDto: CreateCandidateDto) {
    return this.authService.register(createCandidateDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
