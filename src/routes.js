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
      return res.render('profile', { profile: Profile.data });
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
        
        const budget = Job.services.calculateBudget(job, Profile.data['value-per-hour']);
    
        return {
          ...job,
          'remaining-days': remainingDays,
          status,
          budget
        };
      });
    
      return res.render('index', { jobs: updatedJobs, profile: Profile.data });
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

    getById(req, res) {
      const jobId = Number(req.params.id);

      const job = Job.data.find(job => job.id === jobId);

      if(!job) {
        return res.redirect('/');
      }

      const budget = Job.services.calculateBudget(job, Profile.data['value-per-hour']);

      const updatedJob = {
        ...job,
        budget,
      };

      return res.render('job-edit', { job: updatedJob });
    },

    update(req, res) {
      const data = req.body;

      const jobId = Number(req.params.id);
      
      const jobIndex = Job.data.findIndex(job => job.id === jobId);

      if(jobIndex !== -1) {
        Job.data[jobIndex] = {
          ...Job.data[jobIndex],
          name: data.name,
          'daily-hours': Number(data['daily-hours']),
          'total-hours': Number(data['total-hours']),
        };
      }

      return res.redirect('/');
    },

    delete(req, res) {
      const jobId = Number(req.params.id);
      
      Job.data = Job.data.filter(job => job.id !== jobId);

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

    calculateBudget(job, valueHour) {
      return valueHour * job['total-hours'];
    },
  },
};

routes.get('/', Job.controllers.index);

routes.get('/job', (req, res) => res.render('job'));
routes.post('/job', Job.controllers.save);

routes.get('/job/edit', (req, res) => res.redirect('/'));
routes.get('/job/edit/:id', Job.controllers.getById);
routes.post('/job/edit/:id', Job.controllers.update);

routes.post('/job/delete/:id', Job.controllers.delete);

routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;
