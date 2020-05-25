import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthFacade } from './facades/auth.facade';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
    secret:process.env['SECRET'],
    signOptions: {expiresIn: '10h'}
  })
  ],
  providers: [AuthFacade, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
