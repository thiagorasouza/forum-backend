import { Router } from "express";
import {
  createUserExpressHandler,
  getUserByUsernameExpressHandler,
} from "./expressHandlers";

export const getUserRoutes = (): Router => {
  const router = Router();

  router.post("/", createUserExpressHandler);
  // router.get("/:username", getUserByUsernameExpressHandler);

  return router;
};
