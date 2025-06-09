import { Body, Controller, Header, Headers, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthLoginDto, AuthSignUpDto } from 'src/dtos/auth.dto';
import { AuthService } from 'src/services/auth/auth.service';
@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() data: AuthSignUpDto) {
    await this.authService.signUp(data);
    return { message: 'success' };
  }
  @Post('login')
  async login(@Body() credencials: AuthLoginDto) {
    return await this.authService.signIn(credencials);
  }

  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req: Request) {
    const jwtToken = req.headers.authorization;
    return await this.authService.logout(jwtToken);
  }
}
