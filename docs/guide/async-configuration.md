# Async Configuration

Useful when your DB path or config comes from `ConfigService` or environment variables:

```ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DuckDbModule } from 'nestjs-duckdb';

@Module({
  imports: [
    DuckDbModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        database: config.get('DUCKDB_PATH'),
      }),
    }),
  ],
})
export class AppModule {}
```

## Using a class instead of a factory

If you prefer a dedicated options class, implement `DuckDbOptionsFactory`:

```ts
import { Injectable } from '@nestjs/common';
import { DuckDbOptionsFactory, DuckDbModuleOptions } from 'nestjs-duckdb';

@Injectable()
export class DuckDbConfigService implements DuckDbOptionsFactory {
  createDuckDbOptions(): DuckDbModuleOptions {
    return { database: process.env.DUCKDB_PATH ?? ':memory:' };
  }
}
```

```ts
DuckDbModule.forRootAsync({
  useClass: DuckDbConfigService,
});
```
