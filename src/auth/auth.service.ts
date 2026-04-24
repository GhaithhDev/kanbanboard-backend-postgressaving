import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload.object';
import { Authenticated } from './authenticated.object';

@Injectable()
export class AuthService {

    constructor(
        private usersRepository : UsersRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto : AuthCredentialsDto) : Promise<Authenticated> {//how is this calling the repository direcly with zero checks??
        //well dto is already checking if we have only two props username and password and if they checks out, that's all I need

        const user: User = await this.usersRepository.createUser(authCredentialsDto);
        
        return this.getAuthenticatedData(user.username);
    }

    async getAuthenticatedData(usenrname: string) : Promise<Authenticated> {
        const accessToken = await this.getAccessToken(usenrname);
        return{
            username: usenrname,
            accessToken: accessToken
        }
    }

    async getAccessToken(username: string) : Promise<string> {
        const payload : JwtPayload = {username};
        const accessToken: string = await this.jwtService.sign(payload);
        return accessToken;
    }



    async signIn(signInDto : SignInDto) : Promise<Authenticated> { //will return a token
        const {username , password} = signInDto;
        let user : User | null
        try{
           user = await this.usersRepository.getUserByUsername(username); 

        }catch(error){
            if (error instanceof NotFoundException){
                throw new NotFoundException("Username doesn't exist.");
            }
            throw new InternalServerErrorException();
        }
        
        const isPasswordCorrect = await bcrypt.compare( password,user.password)
        if (!isPasswordCorrect){
            throw new UnauthorizedException("Check your credentials");
        }
        
        return this.getAuthenticatedData(username);
    }
}
