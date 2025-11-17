// import necessary module and files

import express from "express";
// Middleware imports
import cors from "cors";
// Security middleware
import helmet from "helmet";
// Logging middleware
import morgan from "morgan";
// Database connection
import connectDB from "./libs/dbConnect.js";

// Route imports
import reminderRouter from "./routes/reminderRouter.js";
import authRouter from "./routes/authRoutes.js";
// Connect to the database locally
connectDB();

// Initialize Express app
const app = express();
// Middleware
app.use(cors());

app.use(express.json());

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan("dev"));

// Routes
app.use("/reminders", reminderRouter);
app.use("/auth", authRouter);

// Start the server from env or 4000

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
