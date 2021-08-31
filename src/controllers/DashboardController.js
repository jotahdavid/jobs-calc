const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    let jobTotalHours = 0;

    const updatedJobs = jobs.map(job => {
      const remainingDays = JobUtils.getRemainingDays(job);

      const status = remainingDays <= 0 ? 'done' : 'progress';
      statusCount[status]++;

      jobTotalHours += status === 'progress' ? job['daily-hours'] : 0;
      
      const budget = JobUtils.calculateBudget(job, profile['value-per-hour']);

      return {
        ...job,
        'remaining-days': remainingDays,
        status,
        budget,
      };
    });

    const freeTime = profile['hours-per-day'] - jobTotalHours;

    return res.render('index', { jobs: updatedJobs, profile, statusCount, freeTime });
  },
};
