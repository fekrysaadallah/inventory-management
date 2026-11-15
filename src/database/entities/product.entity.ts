import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'product' })
export class Product {
  @PrimaryKey({ type: 'varchar(255)', length: 255 })
  sku: string;

  @Property({ type: 'text' })
  name: string;
}
