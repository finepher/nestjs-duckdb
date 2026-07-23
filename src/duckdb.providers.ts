import { Provider } from '@nestjs/common';
import * as duckdb from 'duckdb';
import { DUCKDB_CONNECTION, DUCKDB_MODULE_OPTIONS } from './duckdb.constants';
import { DuckDbConfig, DuckDbModuleOptions } from './interfaces/duckdb-options.interface';

/**
 * The native duckdb driver expects config values as strings.
 * This converts our typed config (numbers, booleans, strings) into
 * the string map the driver actually accepts, without losing type safety
 * on the public-facing API.
 */
function toDriverConfig(config?: DuckDbConfig): Record<string, string> {
  if (!config) return {};

  return Object.entries(config).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    },
    {},
  );
}

export function createDuckDbConnectionProvider(): Provider {
  return {
    provide: DUCKDB_CONNECTION,
    useFactory: (options: DuckDbModuleOptions) => {
      const database = options?.database ?? ':memory:';
      const driverConfig = toDriverConfig(options?.config);

      return new Promise<duckdb.Database>((resolve, reject) => {
        const db = new duckdb.Database(database, driverConfig, (err) => {
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
