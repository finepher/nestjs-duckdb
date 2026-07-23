import { ModuleMetadata, Type } from '@nestjs/common';

/**
 * Known DuckDB configuration options, typed individually for autocomplete
 * and type-checking. Any option not listed here can still be passed via
 * the index signature, since DuckDB adds new settings over time.
 *
 * Reference: https://duckdb.org/docs/configuration/overview
 */
export interface DuckDbConfig {
  /** How the database file is opened. Defaults to 'automatic'. */
  access_mode?: 'automatic' | 'read_only' | 'read_write';

  /** Number of threads used for query execution. */
  threads?: number;

  /** Max amount of memory DuckDB can use, e.g. '2GB', '512MB'. */
  max_memory?: string;

  /** Alias for max_memory on some DuckDB versions. */
  memory_limit?: string;

  /** Directory used for temporary files when data spills to disk. */
  temp_directory?: string;

  /** Default sort order for ORDER BY without ASC/DESC. */
  default_order?: 'asc' | 'desc';

  /** Where NULLs sort by default. */
  default_null_order?: 'nulls_first' | 'nulls_last';

  /** Enables the httpfs/parquet/etc. extension auto-install on first use. */
  autoinstall_known_extensions?: boolean;

  /** Enables automatic loading of known extensions when referenced in SQL. */
  autoload_known_extensions?: boolean;

  /** Timezone used for TIMESTAMP WITH TIME ZONE operations. */
  timezone?: string;

  /** Any other DuckDB config key not explicitly typed above. */
  [key: string]: string | number | boolean | undefined;
}

export interface DuckDbModuleOptions {
  /**
   * Path to the DuckDB database file.
   * Use ':memory:' for an in-memory database (default).
   */
  database?: string;

  /**
   * Typed DuckDB configuration passed straight to the driver
   * (access_mode, threads, memory_limit, etc.).
   */
  config?: DuckDbConfig;
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
    ...args: unknown[]
  ) => Promise<DuckDbModuleOptions> | DuckDbModuleOptions;
  inject?: (Type<unknown> | string | symbol)[];
}
