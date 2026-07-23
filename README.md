# nestjs-duckdb

Simple, friendly DuckDB integration for NestJS 🦆

A clean and easy way to use DuckDB in your NestJS apps. Plug it in, query your data, and get on with building — no extra setup headache.

## Install

```bash
npm install nestjs-duckdb
```

## Quick start

```ts
import { Module } from '@nestjs/common';
import { DuckDbModule } from 'nestjs-duckdb';

@Module({
  imports: [
    DuckDbModule.forRoot({
      database: ':memory:', // or a path like './my.db'
    }),
  ],
})
export class AppModule {}
```

Then inject `DuckDbService` anywhere:

```ts
import { Injectable } from '@nestjs/common';
import { DuckDbService } from 'nestjs-duckdb';

@Injectable()
export class AnalyticsService {
  constructor(private readonly duckDb: DuckDbService) {}

  async getTopUsers() {
    return this.duckDb.query('SELECT * FROM users ORDER BY score DESC LIMIT 10');
  }
}
```

## Async configuration

Useful when your DB path or config comes from `ConfigService` or environment variables:

```ts
DuckDbModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    database: config.get('DUCKDB_PATH'),
  }),
});
```

## API

- `duckDb.query(sql, ...params)` — run a query, get rows back
- `duckDb.run(sql, ...params)` — run a statement with no return rows (CREATE TABLE, INSERT, etc.)
- `duckDb.getConnection()` — access the raw `duckdb.Connection`
- `duckDb.getDatabase()` — access the raw `duckdb.Database`

You can also inject the raw database directly with `@InjectDuckDB()` if you need lower-level control.

## Example app

See [`examples/basic-app`](./examples/basic-app) for a minimal working NestJS app using this package.

## License

MIT
