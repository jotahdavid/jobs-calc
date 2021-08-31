const DATABASE = require('../db/config');

module.exports = {
  async get() {
    const db = await DATABASE();

    const jobs = await db.all(`SELECT * FROM jobs`);

    await db.close();

    return jobs.map(job => ({
      id: job.id,
      name: job.name,
      'daily-hours': job.daily_hours,
      'total-hours': job.total_hours,
      'created-at': job.created_at,
    }));
  },
  async create(job) {
    const db = await DATABASE();

    await db.run(`
      INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "${job.name}",
        ${job['daily-hours']},
        ${job['total-hours']},
        ${job['created-at']}
      )
    `);

    console.log('> [job] Created new one!');

    await db.close();
  },
  async update(job) {
    const db = await DATABASE();

    await db.run(`
      UPDATE jobs SET 
        name = "${job.name}",
        daily_hours = ${job['daily-hours']},
        total_hours = ${job['total-hours']},
        created_at = ${job['created-at']} 
      WHERE id = ${job.id}
    `);
    
    console.log('> [job] Updated!');

    await db.close();
  },
  async delete(id) {
    const db = await DATABASE();

    await db.run(`DELETE FROM jobs WHERE id = ${id}`);

    console.log(`> [job] ID ${id} deleted!`);

    await db.close();
  },
};
