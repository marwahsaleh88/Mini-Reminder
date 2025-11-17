import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendReminderEmail(reminder, toEmail) {
  const info = await transporter.sendMail({
    from: `"Marwah" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Reminder: ${reminder.title}`,
    text: `You have an appointment: ${reminder.description}\nScheduled at: ${new Date(reminder.date).toLocaleString()}`
  });

  console.log("Message sent:", info.messageId);
}
