import {
  BigIntType,
  Entity,
  Enum,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Warehouse } from './warehouse.entity';

export enum ReservationStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Expired = 'expired',
}

@Entity({ tableName: 'reservation' })
@Unique({ properties: ['shopId', 'requestKey'] })
@Index({ properties: ['status', 'expiredAt'] })
export class Reservation {
  @PrimaryKey({ type: new BigIntType('string'), autoincrement: true })
  id: string;

  @Property({ type: 'text' })
  shopId: string;

  @Property({ type: 'text' })
  externalOrderId: string;

  @Enum({
    items: () => ReservationStatus,
    nativeEnumName: 'reservation_status',
    default: ReservationStatus.Pending,
  })
  status: ReservationStatus = ReservationStatus.Pending;

  @ManyToOne(() => Warehouse, {
    fieldName: 'warehouse_id',
    deleteRule: 'restrict',
    index: true,
  })
  warehouse: Warehouse;

  @Property({ type: 'text' })
  requestKey: string;

  @Property({ columnType: 'timestamptz', nullable: true })
  expiredAt?: Date;

  @Property({ columnType: 'timestamptz', defaultRaw: 'current_timestamp' })
  createdAt: Date = new Date();
}
