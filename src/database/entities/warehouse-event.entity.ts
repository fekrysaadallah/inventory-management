import {
  BigIntType,
  Check,
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

export enum WarehouseEventType {
  Received = 'received',
  Shipped = 'shipped',
}

@Entity({ tableName: 'warehouse_event' })
@Unique({ properties: ['warehouse', 'externalEventId'] })
@Check({
  name: 'warehouse_event_quantity_delta_valid',
  expression:
    "(type = 'received' and quantity_delta > 0) or (type = 'shipped' and quantity_delta < 0)",
})
export class WarehouseEvent {
  @PrimaryKey({ type: new BigIntType('string'), autoincrement: true })
  id: string;

  @Enum({
    items: () => WarehouseEventType,
    nativeEnumName: 'warehouse_event_type',
  })
  type: WarehouseEventType;

  @Property({ type: 'text' })
  externalEventId: string;

  @ManyToOne(() => Warehouse, {
    fieldName: 'warehouse_id',
    deleteRule: 'restrict',
  })
  warehouse: Warehouse;

  @ManyToOne(() => Product, {
    fieldName: 'sku',
    referenceColumnName: 'sku',
    deleteRule: 'restrict',
    index: true,
  })
  product: Product;

  @Property({ type: new BigIntType('bigint') })
  quantityDelta: bigint;

  @Property({ columnType: 'timestamptz' })
  occurredAt: Date;

  @Property({ columnType: 'timestamptz', defaultRaw: 'current_timestamp' })
  receivedAt: Date = new Date();
}
