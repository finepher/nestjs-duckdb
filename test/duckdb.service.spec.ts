import { Test } from '@nestjs/testing';
import { DuckDbModule } from '../src/duckdb.module';
import { DuckDbService } from '../src/duckdb.service';

describe('DuckDbService', () => {
  let service: DuckDbService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DuckDbModule.forRoot({ database: 'test.db' })],
    }).compile();

    service = moduleRef.get(DuckDbService);
  });

  it('runs a basic query', async () => {
    const rows = await service.query('SELECT 1 AS value');
    expect(rows[0].value).toBe(1);
  });

  it('creates a table and inserts data', async () => {
    await service.run('CREATE TABLE people (id INTEGER, name VARCHAR)');
    await service.run("INSERT INTO people VALUES (1, 'Finepher')");
    const rows = await service.query('SELECT * FROM people');
    expect(rows).toEqual([{ id: 1, name: 'Finepher' }]);
  });
});
