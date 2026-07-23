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
