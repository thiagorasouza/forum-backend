import request from "supertest";
import { app } from "../../../../../main/app";
import { SequelizeConnection } from "../../sequelize/sequelizeConnection";
import { SequelizeUserModel } from "../../sequelize/sequelizeUserModel";
import { mockCreateUserHttpRequest } from "../../../useCases/createUser/tests/createUserHttpRequest.mock";

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
    const mockRequest = mockCreateUserHttpRequest();
    await request(app).post("/users").send(mockRequest).expect(200);
  });
});
