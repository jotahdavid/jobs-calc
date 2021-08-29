const express = require('express');
const routes = express.Router();

const Profile = {
  data: {
    name: 'jotahdavid',
    avatar: 'https://avatars.githubusercontent.com/u/82552187?v=4',
    'monthly-budget': 3000,
    'days-per-week': 5,
    'hours-per-day': 7,
    'vacation-per-year': 4,
    'value-per-hour': 21.43,
  },

  controllers: {
    index(req, res) {
      return res.render(viewsPath + 'profile', { profile: Profile.data });
    },

    update(req, res) {
      const data = req.body;

      const TOTAL_WEEKS_IN_A_YEAR = 52;

      const totalWeeksPerMonthToWork = (TOTAL_WEEKS_IN_A_YEAR - data['vacation-per-year']) / 12;
      const totalWeeklyHoursToWork = data['hours-per-day'] * data['days-per-week'];
      const totalHoursPerMonthToWork = totalWeeksPerMonthToWork * totalWeeklyHoursToWork;

      const valuePerHour = Number(data['monthly-budget']) / totalHoursPerMonthToWork;

      Profile.data = {
        name: data.name,
        avatar: data.avatar,
        'monthly-budget': Number(data['monthly-budget']),
        'days-per-week': Number(data['days-per-week']),
        'hours-per-day': Number(data['hours-per-day']),
        'vacation-per-year': Number(data['vacation-per-year']),
        'value-per-hour': valuePerHour,
      };

      console.log('> Profile updated!');

      return res.redirect('/profile');
    },
  },
};

const Job = {
  data: [
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
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map(job => {
        const remainingDays = Job.services.getRemainingDays(job);
    
        const status = remainingDays <= 0 ? 'done' : 'progress';
        
        const budget = Profile.data['value-per-hour'] * job['total-hours'];
    
        return {
          ...job,
          'remaining-days': remainingDays,
          status,
          budget
        };
      });
    
      return res.render(viewsPath + 'index', { jobs: updatedJobs, profile: Profile.data });
    },

    save(req, res) {
      const jobId = Job.data[Job.data.length - 1]?.id + 1 || 1;

      Job.data.push({
        id: jobId,
        name: req.body.name,
        'daily-hours': Number(req.body['daily-hours']),
        'total-hours': Number(req.body['total-hours']),
        'created-at': Date.now()
      });

      console.log('> Added new job!');

      return res.redirect('/');
    },
  },

  services: {
    getRemainingDays(job) {
      const totalDaysToJob = Math.floor(job['total-hours'] / job['daily-hours']);
    
      const createdAt = new Date(job['created-at']);
      const dueDay = createdAt.getDate() + totalDaysToJob;
      const dueDate = createdAt.setDate(dueDay);
    
      const timeDiffInMS = dueDate - Date.now();
      const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
    
      const remainingDays = Math.floor(timeDiffInMS / DAY_IN_MILLISECONDS);
    
      return remainingDays;
    },
  },
};

const viewsPath = __dirname + '/views/';

routes.get('/', Job.controllers.index);

routes.get('/job', (req, res) => res.render(viewsPath + 'job'));
routes.post('/job', Job.controllers.save);

routes.get('/job/edit', (req, res) => res.render(viewsPath + 'job-edit'));

routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;
