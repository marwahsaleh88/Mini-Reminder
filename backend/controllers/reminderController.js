import Reminder from "../models/Reminder.js";
import { scheduleReminder, cancelReminder } from "../utils/scheduler.js";
import { sendReminderEmail } from "../utils/mailer.js";

// Show all reminders for the logged-in user
export const getAllReminders = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const reminders = await Reminder.find({ user: req.user._id });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({
      message: "Server error while getting reminders",
      error: error.message,
    });
  }
};

// Create a new reminder
export const createReminder = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const reminder = new Reminder({
      ...req.body,
      user: req.user._id,
      email: req.user.email,
    });

    await reminder.save();

    scheduleReminder(reminder, async (r) => {
      try {
        console.log(`🔔 Reminder "${r.title}" created and scheduled!`);
        if (r.notifyByEmail) {
          await sendReminderEmail(r, req.user.email);
        }
      } catch (err) {
        console.error("Failed to send email or schedule:", err.message);
      }
    });

    res.status(201).json({ msg: "Reminder created successfully!", reminder });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create reminder",
      error: error.message,
    });
  }
};

// Update an existing reminder
export const updateReminder = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const updatedReminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        ...req.body,
        email: req.user.email,
      },
      { new: true, runValidators: true }
    );

    if (!updatedReminder) {
      return res
        .status(404)
        .json({ message: "Reminder not found or not yours" });
    }

    cancelReminder(req.params.id);

    scheduleReminder(updatedReminder, async (r) => {
      try {
        console.log(`🔔 Reminder "${r.title}" updated and rescheduled!`);
        if (r.notifyByEmail) {
          await sendReminderEmail(r, req.user.email);
        }
      } catch (err) {
        console.error("Failed to send email or reschedule:", err.message);
      }
    });

    res.status(200).json(updatedReminder);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update reminder",
      error: error.message,
    });
  }
};

// Delete a reminder
export const deleteReminder = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const deletedReminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedReminder) {
      return res
        .status(404)
        .json({ message: "Reminder not found or not yours" });
    }

    const cancelled = cancelReminder(req.params.id);
    console.log(
      ` Reminder "${deletedReminder.title}" cancelled and deleted.`
    );

    res.status(200).json({
      message: "Reminder deleted successfully",
      cancelled: !!cancelled,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while deleting reminder",
      error: error.message,
    });
  }
};
