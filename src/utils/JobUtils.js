const Job = require('../model/Job');

module.exports = {
  getRemainingDays(job) {
    const totalDaysToJob = Math.floor(job['total-hours'] / job['daily-hours']);
  
    const createdAt = new Date(job['created-at']);
    const dueDay = createdAt.getDate() + totalDaysToJob;
    const dueDate = createdAt.setDate(dueDay);
  
    const timeDiffInMS = dueDate - Date.now();
    const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
  
    const remainingDays = Math.ceil(timeDiffInMS / DAY_IN_MILLISECONDS);
  
    return remainingDays;
  },

  calculateBudget(job, valueHour) {
    return valueHour * job['total-hours'];
  },

  async getJobById(id) {
    const jobs = await Job.get();

    return jobs.find(job => job.id === id);
  },
};
