import { Router } from "express";
import * as auth from "../controllers/authController.js";

const authRouter = Router();

authRouter
  .post("/register", auth.register)     // register new user
  .post("/login", auth.login)           // login user
  .get("/users", auth.getUsers)         // get all users
  .delete("/users/:id", auth.deleteUser); // delete user by id

export default authRouter;
