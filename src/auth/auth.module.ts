import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthFacade } from './facades/auth.facade';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategy/jwt-strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env['SECRET'],
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [AuthFacade, AuthService, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
  exports: [AuthService],
})
export class AuthModule {
}
