import { Controller, Get, Query } from '@nestjs/common';
import { TestReservationInputDto } from './dtos/test-reservation-input.dto';
import { TestReservationOutputDto } from './dtos/test-reservation-output.dto';
import { TestReservationUseCase } from './usecases/test-reservation.usecase';

@Controller('v1/reservations')
export class ReservationController {
  constructor(
    private readonly testReservationUseCase: TestReservationUseCase,
  ) {}

  @Get('test')
  test(
    @Query() _input: TestReservationInputDto,
  ): Promise<TestReservationOutputDto> {
    return this.testReservationUseCase.execute(_input);
  }
}
