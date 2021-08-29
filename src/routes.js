const express = require('express');
const routes = express.Router();

const profile = {
  name: 'jotahdavid',
  avatar: 'https://avatars.githubusercontent.com/u/82552187?v=4',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'hours-per-day': 7,
  'vacation-per-year': 4,
  'value-per-hour': 75
};

const jobs = [
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

function getRemainingDays(job) {
  const totalDaysToJob = Math.floor(job['total-hours'] / job['daily-hours']);

  const createdAt = new Date(job['created-at']);
  const dueDay = createdAt.getDate() + totalDaysToJob;
  const dueDate = createdAt.setDate(dueDay);

  const timeDiffInMS = dueDate - Date.now();
  const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

  const remainingDays = Math.floor(timeDiffInMS / DAY_IN_MILLISECONDS);

  return remainingDays;
};

const viewsPath = __dirname + '/views/';

routes.get('/', (req, res) => {
  const updatedJobs = jobs.map(job => {
    const remainingDays = getRemainingDays(job);

    const status = remainingDays <= 0 ? 'done' : 'progress';
    
    const budget = profile['value-per-hour'] * job['total-hours'];

    return {
      ...job,
      'remaining-days': remainingDays,
      status,
      budget
    };
  });

  return res.render(viewsPath + 'index', { jobs: updatedJobs })
});

routes.get('/job', (req, res) => res.render(viewsPath + 'job'));

routes.post('/job', (req, res) => {
  const jobId = jobs[jobs.length - 1]?.id + 1 || 1;

  jobs.push({
    id: jobId,
    name: req.body.name,
    'daily-hours': Number(req.body['daily-hours']),
    'total-hours': Number(req.body['total-hours']),
    'created-at': Date.now()
  });

  console.log('> Added new job!');

  return res.redirect('/');
});

routes.get('/job/edit', (req, res) => res.render(viewsPath + 'job-edit'));

routes.get('/profile', (req, res) => res.render(viewsPath + 'profile', { profile }));

module.exports = routes;
