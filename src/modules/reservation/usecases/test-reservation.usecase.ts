import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { TestReservationInputDto } from '../dtos/test-reservation-input.dto';
import { TestReservationOutputDto } from '../dtos/test-reservation-output.dto';

@Injectable()
export class TestReservationUseCase implements UseCase {
  constructor(private readonly entityManager: EntityManager) {}

  async execute(
    _input: TestReservationInputDto,
  ): Promise<TestReservationOutputDto> {
    const [output] = await this.entityManager
      .getConnection()
      .execute<TestReservationOutputDto[]>('SELECT 1 + 1 AS result');

    return output;
  }
}
