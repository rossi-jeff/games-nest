import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../global/dto/auth.dto';
import { ResponseLoginDto } from '../global/response/response-login.dto';
import { ResponseUserDto } from '../global/response/response-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: ResponseUserDto,
  })
  async register(@Body() dto: AuthDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 200,
    description: 'Login Success',
    type: ResponseLoginDto,
  })
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto);
  }
}
