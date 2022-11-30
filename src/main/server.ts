import { SequelizeConnection } from "../modules/users/frameworks/sequelize/sequelizeConnection";
import { app } from "./app";
import { config } from "./config";

const port = config.getPort();
const sequelizeUri = config.getSequelizeUri();

SequelizeConnection.connect(sequelizeUri)
  .then(async () => {
    console.log("1. Database connection established");

    await SequelizeConnection.sync();
    console.log("2. Tables synchronized");

    app.listen(port, () => {
      console.log(`3. Server listening on ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
