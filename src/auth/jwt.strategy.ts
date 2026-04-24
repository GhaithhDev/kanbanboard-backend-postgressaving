import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersRepository } from "./users.repository";
import { JwtPayload } from "./jwt.payload.object";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersRepository : UsersRepository) {
        super({
            secretOrKey: 'AssTempSecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload) : Promise<User> {
        const {username} = payload;
        const user: User | null = await this.usersRepository.findOne({
            where: {username: username}
        })
        if (!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}