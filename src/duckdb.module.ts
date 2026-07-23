import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DUCKDB_MODULE_OPTIONS } from './duckdb.constants';
import { createDuckDbConnectionProvider } from './duckdb.providers';
import { DuckDbService } from './duckdb.service';
import {
  DuckDbModuleAsyncOptions,
  DuckDbModuleOptions,
  DuckDbOptionsFactory,
} from './interfaces/duckdb-options.interface';

@Module({})
export class DuckDbModule {
  /** Simple synchronous config: DuckDbModule.forRoot({ database: './my.db' }) */
  static forRoot(
    options: DuckDbModuleOptions = {},
    isGlobal = true,
  ): DynamicModule {
    const optionsProvider: Provider = {
      provide: DUCKDB_MODULE_OPTIONS,
      useValue: options,
    };

    return {
      module: DuckDbModule,
      global: isGlobal,
      providers: [optionsProvider, createDuckDbConnectionProvider(), DuckDbService],
      exports: [DuckDbService],
    };
  }

  /** Async config for when options depend on ConfigService, env vars, etc. */
  static forRootAsync(options: DuckDbModuleAsyncOptions): DynamicModule {
    return {
      module: DuckDbModule,
      global: options.isGlobal ?? true,
      imports: options.imports ?? [],
      providers: [
        ...this.createAsyncProviders(options),
        createDuckDbConnectionProvider(),
        DuckDbService,
      ],
      exports: [DuckDbService],
    };
  }

  private static createAsyncProviders(
    options: DuckDbModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      } as Provider,
    ];
  }

  private static createAsyncOptionsProvider(
    options: DuckDbModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: DUCKDB_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject ?? [],
      };
    }

    const inject = options.useExisting ?? options.useClass;
    if (!inject) {
      throw new Error(
        'DuckDbModule.forRootAsync requires one of useFactory, useExisting, or useClass.',
      );
    }

    return {
      provide: DUCKDB_MODULE_OPTIONS,
      useFactory: async (optionsFactory: DuckDbOptionsFactory) =>
        optionsFactory.createDuckDbOptions(),
      inject: [inject],
    };
  }
}
