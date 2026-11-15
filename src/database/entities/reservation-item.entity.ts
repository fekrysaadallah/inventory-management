import {
  BigIntType,
  Check,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Product } from './product.entity';
import { Reservation } from './reservation.entity';

@Entity({ tableName: 'reservation_item' })
@Unique({ properties: ['reservation', 'product'] })
@Check({
  name: 'reservation_item_quantity_positive',
  expression: 'quantity > 0',
})
export class ReservationItem {
  @PrimaryKey({ type: new BigIntType('string'), autoincrement: true })
  id: string;

  @ManyToOne(() => Reservation, {
    fieldName: 'reservation_id',
    deleteRule: 'cascade',
  })
  reservation: Reservation;

  @ManyToOne(() => Product, {
    fieldName: 'product_id',
    deleteRule: 'restrict',
    index: true,
  })
  product: Product;

  @Property({ type: new BigIntType('bigint') })
  quantity: bigint;
}
