import { SequelizeConnection } from "../modules/users/frameworks/sequelize/sequelizeConnection";
import { app } from "./app";
import { config } from "./config";

const port = config.getPort();

SequelizeConnection.connect()
  .then(() => {
    console.log("Database connection established");

    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
