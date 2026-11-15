import {
  BigIntType,
  Check,
  Entity,
  ManyToOne,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

@Entity({ tableName: 'inventory' })
@Check({ name: 'inventory_on_hand_nonnegative', expression: 'on_hand >= 0' })
@Check({ name: 'inventory_reserved_nonnegative', expression: 'reserved >= 0' })
@Check({
  name: 'inventory_reserved_within_on_hand',
  expression: 'reserved <= on_hand',
})
export class Inventory {
  [PrimaryKeyProp]: ['sku', 'warehouse'];

  @ManyToOne(() => Product, {
    primary: true,
    mapToPk: true,
    fieldName: 'sku',
    referenceColumnName: 'sku',
    columnType: 'varchar(255)',
    updateRule: 'cascade',
    deleteRule: 'restrict',
  })
  sku: string;

  @ManyToOne(() => Warehouse, {
    primary: true,
    fieldName: 'warehouse_id',
    deleteRule: 'restrict',
    index: true,
  })
  warehouse: Warehouse;

  @Property({ type: new BigIntType('bigint'), default: 0 })
  onHand: bigint = 0n;

  @Property({ type: new BigIntType('bigint'), default: 0 })
  reserved: bigint = 0n;

  @Property({
    columnType: 'timestamptz',
    defaultRaw: 'current_timestamp',
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
