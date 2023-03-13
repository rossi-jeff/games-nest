import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../global/dto/auth.dto';
import { JwtPayloadDto } from '../global/dto/jwt-payload.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayloadDto) {
    const { id, UserName } = payload;
    const user = await this.userService.getUserByUserName(UserName);
    if (!user || user.id != id) return null;
    return user;
  }

  async register(dto: AuthDto) {
    const { UserName, password } = dto;
    const user = await this.userService.createUser(UserName, password);
    return this.userService.getUserById(user.id);
  }

  async login(dto: AuthDto) {
    const { UserName, password } = dto;
    const user = await this.userService.getUserByUserName(UserName);
    if (user && user.validatePassword(password)) {
      const { UserName } = user;
      const Token = this._createToken(user);
      return { UserName, Token };
    } else {
      throw new HttpException(
        'Unable to Authenticate',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private _createToken(user: User): string {
    const { id, UserName } = user;
    const iat = Date.now();
    return this.jwtService.sign({ id, UserName, iat });
  }
}
