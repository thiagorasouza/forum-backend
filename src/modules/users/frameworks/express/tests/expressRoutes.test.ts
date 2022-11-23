import request from "supertest";
import { app } from "../../../../../main/app";
import { SequelizeConnection } from "../../sequelize/sequelizeConnection";
import { SequelizeUserModel } from "../../sequelize/sequelizeUserModel";
import { mockCreateUserHttpRequest } from "../../../useCases/createUser/tests/mocks/createUserHttpRequest.mock";

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
    await request(app).post("/users").send(mockRequest.body).expect(200);
  });

  // it("should return 200 when a username is found", async () => {
  //   const mockRequest = mockCreateUserHttpRequest();
  //   await request(app).post("/users").send(mockRequest).expect(200);
  //   await request(app).get(`/users/${mockRequest.body.username}`).expect(200);
  // });
});
