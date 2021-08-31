const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');

const Profile = require('../model/Profile');

module.exports = {
  async save(req, res) {
    const data = req.body;

    await Job.create({
      name: data.name,
      'daily-hours': Number(data['daily-hours']),
      'total-hours': Number(data['total-hours']),
      'created-at': Date.now()
    });

    return res.redirect('/');
  },

  async getById(req, res) {
    const jobId = Number(req.params.id);
    const profile = await Profile.get();

    const job = await JobUtils.getJobById(jobId);

    if(!job) {
      return res.redirect('/');
    }

    const budget = JobUtils.calculateBudget(job, profile['value-per-hour']);

    const updatedJob = {
      ...job,
      budget,
    };

    return res.render('job-edit', { job: updatedJob });
  },

  async update(req, res) {
    const data = req.body;
    const jobId = Number(req.params.id);
    
    const job = await JobUtils.getJobById(jobId);

    if(job) {
      await Job.update({
        ...job,
        name: data.name,
        'daily-hours': Number(data['daily-hours']),
        'total-hours': Number(data['total-hours']),
      });
    }

    return res.redirect('/');
  },

  async delete(req, res) {
    const jobId = Number(req.params.id);

    const job = await JobUtils.getJobById(jobId);

    if(job) {
      await Job.delete(jobId);
    }

    return res.redirect('/');
  },
};
