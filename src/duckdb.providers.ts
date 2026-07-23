import { Provider } from '@nestjs/common';
import * as duckdb from 'duckdb';
import { DUCKDB_CONNECTION, DUCKDB_MODULE_OPTIONS } from './duckdb.constants';
import { DuckDbModuleOptions } from './interfaces/duckdb-options.interface';

export function createDuckDbConnectionProvider(): Provider {
  return {
    provide: DUCKDB_CONNECTION,
    useFactory: (options: DuckDbModuleOptions) => {
      const database = options?.database ?? ':memory:';
      return new Promise<duckdb.Database>((resolve, reject) => {
        const db = new duckdb.Database(database, options?.config ?? {}, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(db);
          }
        });
      });
    },
    inject: [DUCKDB_MODULE_OPTIONS],
  };
}
