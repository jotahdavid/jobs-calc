const DATABASE = require('./config');

(async () => {
  const db = await DATABASE();

  console.log('> [database] Starting...');

  try {
    console.log('> [database] Creating "profile" table...');

    await db.get('SELECT * FROM profile');

    console.log('> [database] "profile" table already exists!');

  } catch (err) {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS profile(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_per_hour FLOAT
      )
    `);

    await db.run(`
      INSERT INTO profile(
        name,
        avatar,
        monthly_budget,
        days_per_week,
        hours_per_day,
        vacation_per_year,
        value_per_hour
      ) VALUES (
        'Usuário(a)', '', 2000, 5, 8, 4, 12.5
      )
    `);

    console.log('> [database] "profile" table created!');
  }

  try {
    console.log('> [database] Creating "jobs" table...');

    await db.all('SELECT * FROM jobs');

    console.log('> [database] "jobs" table already exists!');

  } catch (err) {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
      )
    `);

    console.log('> [database] "jobs" table created!');
  }

  await db.close();

  console.log('> [database] Starting done!');
})();
