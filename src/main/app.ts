import express from "express";
import { getUserRoutes } from "../modules/users/adapters/express/expressRoutes";

const app = express();

app.use(express.json());
app.use("/users", getUserRoutes());

export { app };
