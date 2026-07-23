# API Reference

## `DuckDbModule`

| Method | Description |
|---|---|
| `forRoot(options?, isGlobal?)` | Synchronous config, e.g. `DuckDbModule.forRoot({ database: './my.db' })` |
| `forRootAsync(options)` | Async config via `useFactory`, `useClass`, or `useExisting` |

## `DuckDbService`

| Method | Description |
|---|---|
| `query<T>(sql, ...params)` | Run a query, get rows back as `T[]` |
| `run(sql, ...params)` | Run a statement with no return rows (`CREATE TABLE`, `INSERT`, etc.) |
| `getConnection()` | Access the raw `duckdb.Connection` |
| `getDatabase()` | Access the raw `duckdb.Database` |

## `@InjectDuckDB()`

Inject the raw `duckdb.Database` connection directly, if you don't want to go through `DuckDbService`.

```ts
import { Injectable } from '@nestjs/common';
import { InjectDuckDB } from 'nestjs-duckdb';
import * as duckdb from 'duckdb';

@Injectable()
export class RawService {
  constructor(@InjectDuckDB() private readonly db: duckdb.Database) {}
}
```
