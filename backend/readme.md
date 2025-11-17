

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
    "_id": "691447a05db53927a45df126",
    "createdAt": "2025-11-12T08:38:56.991Z",
    "updatedAt": "2025-11-12T08:38:56.991Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTE0NDdhMDVkYjUzOTI3YTQ1ZGYxMjYiLCJpYXQiOjE3NjI5MzY3MzcsImV4cCI6MTc5NDQ5NDMzN30.lFKC9Q2eioA-z3BPbUMEu8nDiT9HDop_Hmz7daZKotI"
}


__________________________________________________________________

post 
http://localhost:3000/reminders



copy token :

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTE0NDdhMDVkYjUzOTI3YTQ1ZGYxMjYiLCJpYXQiOjE3NjI5MzY3MzcsImV4cCI6MTc5NDQ5NDMzN30.lFKC9Q2eioA-z3BPbUMEu8nDiT9HDop_Hmz7daZKotI



post >> Auth >> Beare  >>> past token 
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
    "_id": "69144a2c5db53927a45df12b",
    "createdAt": "2025-11-12T08:49:48.840Z",
    "updatedAt": "2025-11-12T08:49:48.840Z",
    "__v": 0
  }
}


_______________________________

put 
http://localhost:3000/reminders/_id 


auth>> beater >> token 

Body → JSON >>><

{
  "title": "Study MERN project (updated)",
  "description": "Authentication logic completed!",
  "isCompleted": true
}

________________________________

delete   
http://localhost:3000/reminders/_id 


auth >>> bearer >> token 



{
  "message": "Reminder deleted successfully"
}
__________________________________________________________-

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


delete  user 
http://localhost:3000/auth/users/69130a2eebc1e5a6c6d69ef8



POST http://localhost:3000/auth/login





POST http://localhost:3000/auth/register    


###  Node-Schedule : 
ist eine einfache Bibliothek für Node.js . Ideal für kleine Projekte, z. B. Erinnerungen




```   js 

// npm install node-schedule
// Import the node-schedule library
const schedule = require('node-schedule');

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
schedule.scheduleJob('0 9 * * *', function(){
  // This code runs automatically at 9:00 AM
  // Right now, it just calls our reminder function
  sendReminderToUser(1, "Time for your daily reminder!");
});

// Another example: schedule a one-time reminder at a specific date
const date = new Date(2025, 10, 17, 18, 0, 0); // 17 Nov 2025, 18:00
schedule.scheduleJob(date, function(){
  // This will run exactly once at the given date/time
  sendReminderToUser(1, "One-time reminder at 6 PM!");
});


```