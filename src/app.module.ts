import { Module } from '@nestjs/common';
import { ReservationModule } from './modules/reservation';
import { WarehouseEventsModule } from './modules/warehouse-events';

@Module({
  imports: [ReservationModule, WarehouseEventsModule],
})
export class AppModule {}
