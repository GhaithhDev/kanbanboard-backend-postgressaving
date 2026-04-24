import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService) {}
    @Post('signUp')
    signUp(@Body() authCredentialsDto : AuthCredentialsDto){
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('signIn')
    signIn(@Body() signInDto : SignInDto) : Promise<{accessToken: string}> {
        return this.authService.signIn(signInDto);
    }
}
