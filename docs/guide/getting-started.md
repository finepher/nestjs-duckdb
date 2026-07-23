# Getting Started

## Install

```bash
npm install nestjs-duckdb
```

## Quick start

Register the module in your app:

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

## Next steps

- [Async configuration](./async-configuration) - pull config from `ConfigService` or env vars
- [API reference](./api-reference) - full method list

## Typed DuckDB configuration

The `config` option is fully typed against real DuckDB settings, so you get autocomplete and type-checking instead of a loose string map:

```ts
DuckDbModule.forRoot({
  database: './my.db',
  config: {
    access_mode: 'read_write', // 'automatic' | 'read_only' | 'read_write'
    threads: 4,
    max_memory: '2GB',
    temp_directory: '/tmp/duckdb',
  },
});
```

Any DuckDB setting not explicitly typed still works via the index signature, e.g. `config: { some_new_setting: 'value' }`.
