import { Test } from '@nestjs/testing';
import { DuckDbModule } from '../src/duckdb.module';
import { DuckDbService } from '../src/duckdb.service';

describe('DuckDbService', () => {
  let service: DuckDbService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DuckDbModule.forRoot({ database: ':memory:' })],
    }).compile();

    service = moduleRef.get(DuckDbService);
  });

  it('runs a basic query', async () => {
    const rows = await service.query('SELECT 1 AS value');
    expect(rows[0].value).toBe(1);
  });

  it('creates a table and inserts data', async () => {
    await service.run('CREATE TABLE people (id INTEGER, name VARCHAR)');
    await service.run("INSERT INTO people VALUES (1, 'Ada')");
    const rows = await service.query('SELECT * FROM people');
    expect(rows).toEqual([{ id: 1, name: 'Ada' }]);
  });

  it('rejects invalid SQL in query()', async () => {
    await expect(service.query('SELECT * FROM missing_table')).rejects.toThrow();
  });

  it('rejects invalid SQL in run()', async () => {
    await expect(service.run('CREATE TABLE broken (id INTEGER')).rejects.toThrow();
  });

  it('exposes the raw database and connection handles', () => {
    expect(service.getConnection()).toBeDefined();
    expect(service.getDatabase()).toBeDefined();
    expect(typeof service.getConnection().all).toBe('function');
    expect(typeof service.getDatabase().connect).toBe('function');
  });
});

describe('DuckDbService with typed config', () => {
  it('accepts typed DuckDbConfig options', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        DuckDbModule.forRoot({
          database: ':memory:',
          config: {
            access_mode: 'read_write',
            threads: 4,
            max_memory: '1GB',
            timezone: 'UTC',
          },
        }),
      ],
    }).compile();

    const typedService = moduleRef.get(DuckDbService);
    const rows = await typedService.query('SELECT 1 AS value');
    expect(rows[0].value).toBe(1);
  });
});
