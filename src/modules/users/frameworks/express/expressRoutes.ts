import { Router } from "express";
import {
  createUserHandler,
  getUserByUsernameHandler,
  loginUserHandler,
} from "./expressHandlers";

export const getUserRoutes = (): Router => {
  const router = Router();

  router.post("/users", createUserHandler);
  router.get("/users/:username", getUserByUsernameHandler);
  router.post("/login", loginUserHandler);

  return router;
};
