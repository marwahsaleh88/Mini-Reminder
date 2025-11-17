

### Node-Schedule :

ist eine einfache Bibliothek für Node.js . Ideal für kleine Projekte, z. B. Erinnerungen

```js
// npm install node-schedule
// Import the node-schedule library
const schedule = require("node-schedule");

// Imagine we have a function that sends a reminder to the user
function sendReminderToUser(userId, message) {
  // In a real app, this could be:
  // - sending a notification to the frontend via WebSocket
  // - sending an email
  // - saving a reminder in the database
  console.log(`Reminder for user ${userId}: ${message}`);
}

// Schedule a job to run every day at 9:00 AM
// The cron expression '0 9 * * *' means: minute=0, hour=9, every day
schedule.scheduleJob("0 9 * * *", function () {
  // This code runs automatically at 9:00 AM
  // Right now, it just calls our reminder function
  sendReminderToUser(1, "Time for your daily reminder!");
});

// Another example: schedule a one-time reminder at a specific date
const date = new Date(2025, 10, 17, 18, 0, 0); // 17 Nov 2025, 18:00
schedule.scheduleJob(date, function () {
  // This will run exactly once at the given date/time
  sendReminderToUser(1, "One-time reminder at 6 PM!");
});
```



## How it works

The **Mini-Reminder** project is an  application that allows users to register, log in, and manage reminders securely.

### 🔑 Authentication
- Users register and log in with their email and password.
- A **JWT token** is generated on login and used to protect all reminder routes.
- Duplicate emails are prevented by MongoDB's `unique: true` index.

### 📌 Reminder CRUD
- **Create**: `POST /reminders` adds a new reminder to the database.
- **Read**: `GET /reminders` fetches all reminders for the logged-in user.
- **Update**: `PUT /reminders/:id` modifies an existing reminder.
- **Delete**: `DELETE /reminders/:id` removes a reminder.

### ⏰ Scheduling
- The project uses **node-schedule** to run jobs at specific times.
- When a reminder is created or updated, a scheduled job is set.
- If the trigger time is already past, the reminder fires immediately.

### 📬 Notifications
- At the scheduled time, the backend executes the job.
- The reminder can be sent via **Nodemailer** as an email notification.
- Terminal logs show scheduling details and confirmation when a message is sent.

### 🖥️ Terminal Logs
- Logs display:
  - Reminder title and target date
  - Current server time
  - Scheduled trigger time
  - Status messages (created, updated, deleted, or fired immediately)
  - Email delivery confirmation


(((((((((((((((((((((((((((((((((((((((test )))))))))))))))))))))))))))))))))))))))
post  
http://localhost:3000/auth/register

body >>>> JSON

{
"name": "Marwah",
"email": "marwah2@example.com",
"password": "123456"
}

Response
{
"user": {
"name": "Marwah",
"email": "marwah2@example.com",
"roles": "user",
"\_id": "691447a05db53927a45df126",
"createdAt": "2025-11-12T08:38:56.991Z",
"updatedAt": "2025-11-12T08:38:56.991Z",
"\_\_v": 0
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTE0NDdhMDVkYjUzOTI3YTQ1ZGYxMjYiLCJpYXQiOjE3NjI5MzY3MzcsImV4cCI6MTc5NDQ5NDMzN30.lFKC9Q2eioA-z3BPbUMEu8nDiT9HDop_Hmz7daZKotI"
}

---

post
http://localhost:3000/reminders

copy token :

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTE0NDdhMDVkYjUzOTI3YTQ1ZGYxMjYiLCJpYXQiOjE3NjI5MzY3MzcsImV4cCI6MTc5NDQ5NDMzN30.lFKC9Q2eioA-z3BPbUMEu8nDiT9HDop_Hmz7daZKotI

post >> Auth >> Beare >>> past token
body >> json

{
"title": "Study MERN project",
"description": "Finish authentication logic",
"date": "2025-11-12T10:00:00Z"
}

response

{
"msg": "Reminder created successfully!",
"reminder": {
"user": "691447a05db53927a45df126",
"title": "Study MERN project",
"description": "Finish authentication logic",
"date": "2025-11-12T10:00:00.000Z",
"isCompleted": false,
"notifyByEmail": false,
"\_id": "69144a2c5db53927a45df12b",
"createdAt": "2025-11-12T08:49:48.840Z",
"updatedAt": "2025-11-12T08:49:48.840Z",
"\_\_v": 0
}
}

---

put
http://localhost:3000/reminders/\_id

auth>> beater >> token

Body → JSON >>><

{
"title": "Study MERN project (updated)",
"description": "Authentication logic completed!",
"isCompleted": true
}

---

delete  
http://localhost:3000/reminders/\_id

auth >>> bearer >> token

{
"message": "Reminder deleted successfully"
}
****************************\_\_****************************-

get all

http://localhost:3000/reminders

auth >>> bearer >> token

[]
no reminders

؟؟؟؟؟؟؟

## user

get
http://localhost:3000/auth/users

all user

||||||||||||||||||||||||||||||||||||||

post
http://localhost:3000/reminders

auth >> brarer >> token

body>> json >>

{
"title": "Test",
"description": "You have an appointment",
"date": "2025-11-12T10:55:00"
}

{
"title": "Test",
"description": "You have an appointment",
"date": "2025-11-12T10:46:00"
}

.....................................

post

http://localhost:3000/reminders

auth >>> bearer >> token

body>> json

{
"title": "Test Reminder",
"description": "Check if scheduler and email work",
"date": "2025-11-12T11:45:00",
"notifyByEmail": true
}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTE0NjhkODZiNTQxMTVjYmI2Yzc3ZTQiLCJpYXQiOjE3NjI5NDUyNDAsImV4cCI6MTc5NDUwMjg0MH0.B3EopFQGC6YprVIaTOsQjf_WN2e6QmYYLbgjcHDGT1s

delete user
http://localhost:3000/auth/users/69130a2eebc1e5a6c6d69ef8

POST http://localhost:3000/auth/login

POST http://localhost:3000/auth/register

