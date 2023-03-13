import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../global/dto/jwt-payload.dto';
import { AuthService } from './auth.service';

const secretOrKey = process.env.JWT_SECRET || 'Su93r53cre7!';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
    });
  }

  async validate(payload: JwtPayloadDto) {
    return await this.authService.validateUser(payload);
  }
}
