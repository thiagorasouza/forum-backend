import express from "express";
import { getUserRoutes } from "../modules/users/frameworks/express/expressRoutes";

const app = express();

app.use(express.json());
app.use("/", getUserRoutes());

export { app };
