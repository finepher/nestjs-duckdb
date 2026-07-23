import { Controller, Get } from '@nestjs/common';
import { DuckDbService } from 'nestjs-duckdb';

@Controller()
export class AppController {
  constructor(private readonly duckDb: DuckDbService) {}

  @Get('ping')
  async ping() {
    const rows = await this.duckDb.query('SELECT 42 AS answer');
    return rows[0];
  }
}
