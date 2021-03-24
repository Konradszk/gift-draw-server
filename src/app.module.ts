import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrawModule } from './draw/draw.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    DrawModule,
    UserModule,
    SharedModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
