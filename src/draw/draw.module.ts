import { Module } from '@nestjs/common';
import { DrawController } from './controllers/draw.controller';
import { DrawService } from './services/draw.service';
import { AzureTableStorageModule } from '@nestjs/azure-database/dist';
import { Draw } from './domain/draw';
import { DrawFacade } from './facades/draw.facade';

@Module({
  imports: [AzureTableStorageModule.forFeature(Draw, {createTableIfNotExists: true})],
  controllers: [DrawController],
  providers: [DrawService, DrawFacade],
})
export class DrawModule {}
