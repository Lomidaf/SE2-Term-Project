import { Controller, Post, UseGuards ,Request, Res, Response  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import cookieParser from 'cookie-parser';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Res({ passthrough: true }) response, @Request() req) {
      const token = await this.authService.login(req.user);
      response.cookie('jwt',token.access_token,{expires: new Date(Date.now()+ 24 * 3600000),signed: true,httpOnly: true})
      return token;
    }
}
