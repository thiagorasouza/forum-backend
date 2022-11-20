import request from "supertest";
import { app } from "../../../../../main/app";
import { SequelizeConnection } from "../../sequelize/sequelizeConnection";
import { SequelizeUserModel } from "../../sequelize/sequelizeUserModel";
import { CreateUserHttpRequest } from "../../../useCases/createUser/createUserHttpRequest";

const mockCreateUserRequest: CreateUserHttpRequest = {
  body: {
    email: "any_email@email.com",
    password: "any_password",
  },
};

describe("CreateUserExpressRoute Test Suite", () => {
  beforeAll(async () => {
    await SequelizeConnection.connect([SequelizeUserModel]);
    await SequelizeUserModel.sync();
  });

  beforeEach(async () => {
    SequelizeUserModel.destroy({ truncate: true });
  });

  afterAll(async () => {
    await SequelizeConnection.disconnect();
  });

  it("should return 200 when a user is created", async () => {
    await request(app).post("/users").send(mockCreateUserRequest).expect(200);
  });
});
