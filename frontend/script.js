let token = null;

async function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    console.log("Registered:", data);

    if (data.token) {
      token = data.token;
      console.log("Token after register:", token);
    }
  } catch (err) {
    console.error("Register error:", err);
  }
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login response:", data);

    token = data.token;
    if (!token) {
      alert("Login failed: token not received");
      return;
    }

    console.log("Logged in successfully, token:", token);
    loadReminders();
  } catch (err) {
    console.error("Login error:", err);
  }
}

async function addReminder() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const notifyByEmail = document.getElementById("notify").checked;
  const email = document.getElementById("reminderEmail").value;

  try {
    const res = await fetch("http://localhost:3000/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, date, notifyByEmail, email }),
    });

    const data = await res.json();
    console.log("Reminder added:", data);
    loadReminders();
  } catch (err) {
    console.error("Add reminder error:", err);
  }
}

async function loadReminders() {
  try {
    const res = await fetch("http://localhost:3000/reminders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const reminders = await res.json();
    const list = document.getElementById("reminderList");
    list.innerHTML = "";

    reminders.forEach(r => {
      const li = document.createElement("li");
      li.textContent = `${r.title} - ${new Date(r.date).toLocaleString()} `;

      // زر تعديل
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editReminder(r);

      // زر حذف
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteReminder(r._id);

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Load reminders error:", err);
  }
}

async function editReminder(reminder) {
  const newTitle = prompt("Enter new title:", reminder.title);
  const newDate = prompt("Enter new date (YYYY-MM-DD HH:mm):", reminder.date);

  if (!newTitle || !newDate) return;

  try {
    const res = await fetch(`http://localhost:3000/reminders/${reminder._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newTitle,
        date: newDate,
        description: reminder.description,
        notifyByEmail: reminder.notifyByEmail,
      }),
    });

    const data = await res.json();
    console.log("Reminder updated:", data);
    loadReminders();
  } catch (err) {
    console.error("Edit reminder error:", err);
  }
}

async function deleteReminder(id) {
  try {
    const res = await fetch(`http://localhost:3000/reminders/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log("Deleted:", data);
    loadReminders();
  } catch (err) {
    console.error("Delete reminder error:", err);
  }
}

async function getUsers() {
  try {
    const res = await fetch("http://localhost:3000/auth/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const users = await res.json();
    const list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(u => {
      const li = document.createElement("li");
      li.textContent = `${u.name} (${u.email})`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteUser(u._id);

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Get users error:", err);
  }
}

async function deleteUser(id) {
  try {
    const res = await fetch(`http://localhost:3000/auth/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log("User deleted:", data);
    getUsers();
  } catch (err) {
    console.error("Delete user error:", err);
  }
}
