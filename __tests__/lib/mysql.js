import mysql from '../../lib/mysql';
import settings from '../../etc/settings';

const { createPool } = mysql;
let pool;
beforeAll(() => {
  const conf = { ...settings.mysql };
  pool = createPool(conf);
  return pool.query('drop table jest').catch(() => {});
});

afterAll(() => pool.query('drop table jest').catch(() => {}));

describe('mysql api', () => {
  test('create', async () => {
    const ret = await pool.query(`
      create table jest (
        id int unsigned primary key auto_increment,
        counter int unsigned not null default 0
      )
    `);
    expect(ret.fieldCount).toBe(0);
  });

  test('insert', async () => {
    const ret = await pool.executeInsert('insert into jest set ?', [{ counter: 1 }]);
    expect(ret).toBe(1);
  });

  test('query', async () => {
    const ret = await pool.query('select * from jest');
    expect(Array.isArray(ret)).toBe(true);
    expect(ret.length).toBe(1);
    expect(ret[0].id).toBe(1);
  });

  test('query error', async () => {
    const ret = await pool.query('select * from jestx').catch(() => false);
    expect(ret).toBeFalsy();
  });

  test('queryObject', async () => {
    const ret = await pool.queryObject('select * from jest');
    expect(ret.id).toBe(1);
  });

  test('update success', async () => {
    const ret = await pool.executeUpdate('update jest set ? where id = ?', [{ counter: 2 }, 1]);
    expect(ret).toBe(true);
    const ret2 = await pool.queryObject('select * from jest');
    expect(ret2.counter).toEqual(2);
  });


  test('update failure', async () => {
    const ret = await pool.executeUpdate('update jest set ? where id = ?', [{ counter: 2 }, 2]);
    expect(ret).toBe(false);
  });

  test('queryOne', async () => {
    const ret = await pool.queryOne('select * from jest');
    expect(ret).toEqual(1);
  });

  test('queryOne failer', async () => {
    const ret = await pool.queryOne('select * from jest where id = 99').catch(() => false);
    expect(ret).toBeFalsy();
  });

  test('getConnect', () => {
    const conn = pool.getConnection();
    expect(typeof conn.then).toBe('function');
    expect(typeof conn.catch).toBe('function');
  });

  test('transcation success', async () => {
    await pool.transaction([['update jest set counter = 4 where id = 1'], ['insert into jest set counter = 9']]);
    const ret = await pool.query('select * from jest');
    expect(ret.length).toEqual(2);
    expect(ret[0].counter).toEqual(4);
    expect(ret[1].counter).toEqual(9);
  });

  test('transcation failure', async () => {
    // insert counter 故意写为 conter
    const ret1 = await pool.transaction([['update jest set counter = 5 where id = 1'], ['insert into jest set conter = 9']]).catch(() => false);
    expect(ret1).toBeFalsy();
    const ret = await pool.query('select * from jest');
    expect(ret.length).toEqual(2);
    expect(ret[0].counter).toEqual(4);
  });
});
