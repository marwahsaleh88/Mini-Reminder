import schedule from "node-schedule";

const jobs = {};

// reschedule the reminder 10 minutes before the actual time
export function scheduleReminder(reminder, callback) {
// create detailed logs for debugging
  console.log("---- Scheduling reminder ----");
  console.log("Reminder title:", reminder.title);
  console.log("Reminder raw date (DB value):", reminder.date);
  console.log("Now:", new Date(), "ISO:", new Date().toISOString());
  console.log("Timezone offset (minutes):", new Date().getTimezoneOffset());

  // نحول تاريخ التذكير لـ Date كائن مضمون
  const reminderDate = new Date(reminder.date); // يقبل ISO سواء فيه Z أو لا
  const triggerTime = new Date(reminderDate.getTime() - 10 * 60 * 1000);

  console.log("Reminder target date:", reminderDate, "ISO:", reminderDate.toISOString());
  console.log("Scheduled trigger (10 min before):", triggerTime, "ISO:", triggerTime.toISOString());

  // لو وقت التفعيل في الماضي أو الآن، نفّذ فورًا بدون انتظار
  if (triggerTime.getTime() <= Date.now()) {
    console.log("Trigger time is in the past or now → firing immediately.");
    try {
      callback(reminder);
    } catch (e) {
      console.error("Callback error:", e);
    }
    return;
  }

  const id = reminder._id.toString();
  const job = schedule.scheduleJob(id, triggerTime, () => {
    callback(reminder);
  //  remove the job from tracking after execution 
    delete jobs[id];
  });

  jobs[id] = job;
  console.log("Job scheduled with id:", id);
}

export function cancelReminder(reminderId) {
  const job = jobs[reminderId];
  if (job) {
    job.cancel();
    delete jobs[reminderId];
    return true;
  }
  return false;
}
