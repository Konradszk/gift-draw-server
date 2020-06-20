import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { AzureTableStorageModule } from '@nestjs/azure-database/dist';
import { User } from './domain/user';

@Module({
  controllers: [UserController],
  imports: [AzureTableStorageModule.forFeature(User, { createTableIfNotExists: true })],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}
