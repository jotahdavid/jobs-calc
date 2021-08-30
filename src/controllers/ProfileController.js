const Profile = require('../model/Profile');

module.exports = {
  index(req, res) {
    return res.render('profile', { profile: Profile.get() });
  },

  update(req, res) {
    const data = req.body;

    const TOTAL_WEEKS_IN_A_YEAR = 52;

    const totalWeeksPerMonthToWork = (TOTAL_WEEKS_IN_A_YEAR - data['vacation-per-year']) / 12;
    const totalWeeklyHoursToWork = data['hours-per-day'] * data['days-per-week'];
    const totalHoursPerMonthToWork = totalWeeksPerMonthToWork * totalWeeklyHoursToWork;

    const valuePerHour = Number(data['monthly-budget']) / totalHoursPerMonthToWork;

    Profile.update({
      name: data.name,
      avatar: data.avatar,
      'monthly-budget': Number(data['monthly-budget']),
      'days-per-week': Number(data['days-per-week']),
      'hours-per-day': Number(data['hours-per-day']),
      'vacation-per-year': Number(data['vacation-per-year']),
      'value-per-hour': valuePerHour,
    });

    console.log('> Profile updated!');

    return res.redirect('/profile');
  },
};
