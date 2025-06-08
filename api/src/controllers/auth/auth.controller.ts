import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  @Post('logout')
  async logout(@Headers('authorization') jwtToken: string) {
    return await this.authService.logout(jwtToken);
  }
}
