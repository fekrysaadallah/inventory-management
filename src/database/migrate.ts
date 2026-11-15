import { MikroORM } from '@mikro-orm/postgresql';
import mikroOrmConfig from './mikro-orm.config';

async function migrate(): Promise<void> {
  const orm = await MikroORM.init(mikroOrmConfig);
  try {
    await orm.migrator.up();
  } finally {
    await orm.close();
  }
}

void migrate().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
