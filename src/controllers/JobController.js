const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');

const Profile = require('../model/Profile');

module.exports = {
  save(req, res) {
    const data = req.body;
    const jobs = Job.get();

    const jobId = jobs[jobs.length - 1]?.id + 1 || 1;

    Job.update([
      ...jobs,
      {
        id: jobId,
        name: data.name,
        'daily-hours': Number(data['daily-hours']),
        'total-hours': Number(data['total-hours']),
        'created-at': Date.now()
      },
    ]);

    console.log('> Added new job!');

    return res.redirect('/');
  },

  getById(req, res) {
    const jobId = Number(req.params.id);
    const jobs = Job.get();

    const job = jobs.find(job => job.id === jobId);

    if(!job) {
      return res.redirect('/');
    }

    const budget = JobUtils.calculateBudget(job, Profile.get()['value-per-hour']);

    const updatedJob = {
      ...job,
      budget,
    };

    return res.render('job-edit', { job: updatedJob });
  },

  update(req, res) {
    const data = req.body;
    const jobId = Number(req.params.id);
    const jobs = Job.get();
    
    const jobIndex = jobs.findIndex(job => job.id === jobId);

    if(jobIndex !== -1) {
      jobs[jobIndex] = {
        ...jobs[jobIndex],
        name: data.name,
        'daily-hours': Number(data['daily-hours']),
        'total-hours': Number(data['total-hours']),
      };

      Job.update(jobs);
    }

    return res.redirect('/');
  },

  delete(req, res) {
    const jobId = Number(req.params.id);

    Job.delete(jobId);

    return res.redirect('/');
  },
};
