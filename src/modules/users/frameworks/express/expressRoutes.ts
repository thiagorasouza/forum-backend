import { Router } from "express";
import { createUserHandler, getUserByUsernameHandler } from "./expressHandlers";

export const getUserRoutes = (): Router => {
  const router = Router();

  router.post("/", createUserHandler);
  router.get("/:username", getUserByUsernameHandler);

  return router;
};
