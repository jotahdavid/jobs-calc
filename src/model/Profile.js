const DATABASE = require('../db/config');

module.exports = {
  async get() {
    const db = await DATABASE();

    const data = await db.get('SELECT * FROM profile'); // get one value

    await db.close();

    return {
      name: data.name,
      avatar: data.avatar,
      'monthly-budget': data.monthly_budget,
      'days-per-week': data.days_per_week,
      'hours-per-day': data.hours_per_day,
      'vacation-per-year': data.vacation_per_year,
      'value-per-hour': data.value_per_hour,
    };
  },
  async update(data) {
    const db = await DATABASE();

    await db.run(`
      UPDATE profile SET
        name = "${data.name}",
        avatar = "${data.avatar}",
        monthly_budget = ${data['monthly-budget']},
        days_per_week = ${data['days-per-week']},
        hours_per_day = ${data['hours-per-day']},
        vacation_per_year = ${data['vacation-per-year']},
        value_per_hour = ${data['value-per-hour']}
      WHERE id = 1
    `);

    console.log('> [profile] Updated!');

    await db.close();
  },
};
