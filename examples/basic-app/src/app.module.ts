import { Module } from '@nestjs/common';
import { DuckDbModule } from 'nestjs-duckdb';
import { AppController } from './app.controller';

@Module({
  imports: [
    DuckDbModule.forRoot({
      database: ':memory:', // Use ':memory:' for an in-memory database (default) or specify a file path for a persistent database
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
