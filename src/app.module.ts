import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './database';
import { ReservationModule } from './modules/reservation';
import { WarehouseEventsModule } from './modules/warehouse-events';

@Module({
  imports: [DatabaseModule, ReservationModule, WarehouseEventsModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {}
