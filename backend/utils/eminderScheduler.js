import schedule from "node-schedule";

const jobs = {}; // store all jobs here

// schedule reminder 10 minutes before the date
export function scheduleReminder(reminder, callback) {
  const reminderTime = new Date(new Date(reminder.date) - 10 * 60 * 1000);

  const job = schedule.scheduleJob(reminder._id.toString(), reminderTime, () => {
    callback(reminder); // هنا ينفذ التذكير
  });

  jobs[reminder._id.toString()] = job; // save job
}

// cancel reminder
export function cancelReminder(reminderId) {
  const job = jobs[reminderId];
  if (job) {
    job.cancel();
    delete jobs[reminderId];
    return true;
  }
  return false;
}
