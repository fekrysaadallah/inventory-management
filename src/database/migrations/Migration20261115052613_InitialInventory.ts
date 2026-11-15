import { Migration } from '@mikro-orm/migrations';

export class Migration20261115052613_InitialInventory extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create type "reservation_status" as enum ('pending', 'confirmed', 'cancelled', 'expired');`,
    );
    this.addSql(
      `create type "warehouse_event_type" as enum ('received', 'shipped');`,
    );
    this.addSql(
      `create table "product" ("sku" varchar(255) not null, "name" text not null, constraint "product_pkey" primary key ("sku"));`,
    );

    this.addSql(
      `create table "warehouse" ("id" bigserial primary key, "name" varchar(255) not null);`,
    );

    this.addSql(
      `create table "reservation" ("id" bigserial primary key, "shop_id" text not null, "external_order_id" text not null, "status" "reservation_status" not null default 'pending', "warehouse_id" bigint not null, "request_key" text not null, "expired_at" timestamptz null, "created_at" timestamptz not null default current_timestamp);`,
    );
    this.addSql(
      `create index "reservation_warehouse_id_index" on "reservation" ("warehouse_id");`,
    );
    this.addSql(
      `create index "reservation_status_expired_at_index" on "reservation" ("status", "expired_at");`,
    );
    this.addSql(
      `alter table "reservation" add constraint "reservation_shop_id_request_key_unique" unique ("shop_id", "request_key");`,
    );

    this.addSql(
      `create table "reservation_item" ("id" bigserial primary key, "reservation_id" bigint not null, "product_id" varchar(255) not null, "quantity" bigint not null, constraint reservation_item_quantity_positive check (quantity > 0));`,
    );
    this.addSql(
      `create index "reservation_item_product_id_index" on "reservation_item" ("product_id");`,
    );
    this.addSql(
      `alter table "reservation_item" add constraint "reservation_item_reservation_id_product_id_unique" unique ("reservation_id", "product_id");`,
    );

    this.addSql(
      `create table "inventory" ("sku" varchar(255) not null, "warehouse_id" bigint not null, "on_hand" bigint not null default 0, "reserved" bigint not null default 0, "updated_at" timestamptz not null default current_timestamp, constraint "inventory_pkey" primary key ("sku", "warehouse_id"), constraint inventory_reserved_within_on_hand check (reserved <= on_hand), constraint inventory_reserved_nonnegative check (reserved >= 0), constraint inventory_on_hand_nonnegative check (on_hand >= 0));`,
    );
    this.addSql(
      `create index "inventory_warehouse_id_index" on "inventory" ("warehouse_id");`,
    );

    this.addSql(
      `create table "warehouse_event" ("id" bigserial primary key, "type" "warehouse_event_type" not null, "external_event_id" text not null, "warehouse_id" bigint not null, "sku" varchar(255) not null, "quantity_delta" bigint not null, "occurred_at" timestamptz not null, "received_at" timestamptz not null default current_timestamp, constraint warehouse_event_quantity_delta_valid check ((type = 'received' and quantity_delta > 0) or (type = 'shipped' and quantity_delta < 0)));`,
    );
    this.addSql(
      `create index "warehouse_event_sku_index" on "warehouse_event" ("sku");`,
    );
    this.addSql(
      `alter table "warehouse_event" add constraint "warehouse_event_warehouse_id_external_event_id_unique" unique ("warehouse_id", "external_event_id");`,
    );

    this.addSql(
      `alter table "reservation" add constraint "reservation_warehouse_id_foreign" foreign key ("warehouse_id") references "warehouse" ("id") on update cascade on delete restrict;`,
    );

    this.addSql(
      `alter table "reservation_item" add constraint "reservation_item_reservation_id_foreign" foreign key ("reservation_id") references "reservation" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "reservation_item" add constraint "reservation_item_product_id_foreign" foreign key ("product_id") references "product" ("sku") on update cascade on delete restrict;`,
    );

    this.addSql(
      `alter table "inventory" add constraint "inventory_sku_foreign" foreign key ("sku") references "product" ("sku") on update cascade on delete restrict;`,
    );
    this.addSql(
      `alter table "inventory" add constraint "inventory_warehouse_id_foreign" foreign key ("warehouse_id") references "warehouse" ("id") on update cascade on delete restrict;`,
    );

    this.addSql(
      `alter table "warehouse_event" add constraint "warehouse_event_warehouse_id_foreign" foreign key ("warehouse_id") references "warehouse" ("id") on update cascade on delete restrict;`,
    );
    this.addSql(
      `alter table "warehouse_event" add constraint "warehouse_event_sku_foreign" foreign key ("sku") references "product" ("sku") on update cascade on delete restrict;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "reservation_item" drop constraint "reservation_item_product_id_foreign";`,
    );

    this.addSql(
      `alter table "inventory" drop constraint "inventory_sku_foreign";`,
    );

    this.addSql(
      `alter table "warehouse_event" drop constraint "warehouse_event_sku_foreign";`,
    );

    this.addSql(
      `alter table "reservation" drop constraint "reservation_warehouse_id_foreign";`,
    );

    this.addSql(
      `alter table "inventory" drop constraint "inventory_warehouse_id_foreign";`,
    );

    this.addSql(
      `alter table "warehouse_event" drop constraint "warehouse_event_warehouse_id_foreign";`,
    );

    this.addSql(
      `alter table "reservation_item" drop constraint "reservation_item_reservation_id_foreign";`,
    );

    this.addSql(`drop table if exists "product" cascade;`);

    this.addSql(`drop table if exists "warehouse" cascade;`);

    this.addSql(`drop table if exists "reservation" cascade;`);

    this.addSql(`drop table if exists "reservation_item" cascade;`);

    this.addSql(`drop table if exists "inventory" cascade;`);

    this.addSql(`drop table if exists "warehouse_event" cascade;`);

    this.addSql(`drop type "reservation_status";`);
    this.addSql(`drop type "warehouse_event_type";`);
  }
}
