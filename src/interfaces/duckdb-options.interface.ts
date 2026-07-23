import { ModuleMetadata, Type } from '@nestjs/common';

export interface DuckDbModuleOptions {
  /**
   * Path to the DuckDB database file.
   * Use ':memory:' for an in-memory database (default).
   */
  database?: string;

  /**
   * Extra config passed straight to the DuckDB driver, e.g. access_mode, threads, etc.
   */
  config?: Record<string, string>;
}

export interface DuckDbOptionsFactory {
  createDuckDbOptions(): Promise<DuckDbModuleOptions> | DuckDbModuleOptions;
}

export interface DuckDbModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  /** Marks the module global, same as forRoot's `isGlobal`. */
  isGlobal?: boolean;
  useExisting?: Type<DuckDbOptionsFactory>;
  useClass?: Type<DuckDbOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<DuckDbModuleOptions> | DuckDbModuleOptions;
  inject?: any[];
}
