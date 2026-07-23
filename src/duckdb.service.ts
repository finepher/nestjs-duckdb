import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import * as duckdb from 'duckdb';
import { DUCKDB_CONNECTION } from './duckdb.constants';

@Injectable()
export class DuckDbService implements OnModuleDestroy {
  private readonly connection: duckdb.Connection;

  constructor(@Inject(DUCKDB_CONNECTION) private readonly db: duckdb.Database) {
    this.connection = this.db.connect();
  }

  /** Run a query and get all rows back as an array of objects. */
  query<T = any>(sql: string, ...params: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.connection.all(sql, ...params, (err: Error | null, rows: unknown) => {
        if (err) return reject(err);
        resolve(rows as T[]);
      });
    });
  }

  /** Run a statement that doesn't return rows (INSERT, CREATE TABLE, etc.). */
  run(sql: string, ...params: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.run(sql, ...params, (err: Error | null) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  /** Access the raw duckdb.Connection if you need lower-level control. */
  getConnection(): duckdb.Connection {
    return this.connection;
  }

  /** Access the raw duckdb.Database instance. */
  getDatabase(): duckdb.Database {
    return this.db;
  }

  onModuleDestroy() {
    this.connection.close?.();
  }
}
