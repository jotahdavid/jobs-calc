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
    'created-at': Date.now()
  }
];

const viewsPath = __dirname + '/views/';

routes.get('/', (req, res) => res.render(viewsPath + 'index'));

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
