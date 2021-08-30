let data = {
  name: 'jotahdavid',
  avatar: 'https://avatars.githubusercontent.com/u/82552187?v=4',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'hours-per-day': 7,
  'vacation-per-year': 4,
  'value-per-hour': 21.43,
};

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
};
