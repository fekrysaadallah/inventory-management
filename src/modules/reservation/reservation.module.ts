import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { TestReservationUseCase } from './usecases/test-reservation.usecase';

@Module({
  controllers: [ReservationController],
  providers: [TestReservationUseCase],
})
export class ReservationModule {}
