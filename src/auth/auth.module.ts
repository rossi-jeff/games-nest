import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';

const secret = process.env.JWT_SECRET || 'Su93r53cre7!';
const expiresIn = process.env.JWT_EXPIRES || '7d';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
