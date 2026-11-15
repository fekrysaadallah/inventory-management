import { BigIntType, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'warehouse' })
export class Warehouse {
  @PrimaryKey({ type: new BigIntType('string'), autoincrement: true })
  id: string;

  @Property({ length: 255 })
  name: string;
}
