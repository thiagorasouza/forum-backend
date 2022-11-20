import { Router } from "express";
import { createUserExpressHandler } from "./expressHandlers";

export const getUserRoutes = (): Router => {
  const router = Router();

  router.post("/", createUserExpressHandler);

  return router;
};
