import { Inject } from '@nestjs/common';
import { DUCKDB_CONNECTION } from '../duckdb.constants';

/** Inject the raw duckdb.Database connection directly, if you don't want to go through DuckDbService. */
export const InjectDuckDB = () => Inject(DUCKDB_CONNECTION);
