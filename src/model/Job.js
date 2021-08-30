let data = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 60,
    'created-at': Date.now()
  },
  {
    id: 2,
    name: 'OneTwo Project',
    'daily-hours': 3,
    'total-hours': 45,
    'created-at': Date.now() + 50
  }
];

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
  delete(id) {
    data = data.filter(job => job.id !== id);
  },
};
