import { IsInt, Min } from 'class-validator';

export class TestReservationOutputDto {
  @IsInt()
  @Min(0)
  result: number;
}
