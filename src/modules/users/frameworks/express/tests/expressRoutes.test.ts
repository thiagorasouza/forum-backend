import request from "supertest";
import { app } from "../../../../../main/app";
import { SequelizeConnection } from "../../sequelize/sequelizeConnection";
import { SequelizeUserModel } from "../../sequelize/models/sequelizeUserModel";
import { mockCreateUserHttpRequest } from "../../../useCases/createUser/tests/mocks/createUserHttpRequest.mock";
import { config } from "../../../../../main/config";
import { mockLoginUserHttpRequest } from "../../../useCases/loginUser/tests/mocks/loginUserHttpRequest.mock";

describe("CreateUserExpressRoute Test Suite", () => {
  beforeAll(async () => {
    await SequelizeConnection.connect(config.getSequelizeUri());
    await SequelizeUserModel.sync();
  });

  beforeEach(async () => {
    SequelizeUserModel.destroy({ truncate: true });
  });

  afterAll(async () => {
    await SequelizeConnection.disconnect();
  });

  it("should return 200 when a user is created", async () => {
    const mockRequestBody = mockCreateUserHttpRequest().body;
    await request(app).post("/users").send(mockRequestBody).expect(200);
  });

  it("should return 200 when a username is found", async () => {
    const mockRequestBody = mockCreateUserHttpRequest().body;
    await request(app).post("/users").send(mockRequestBody).expect(200);

    const username = mockRequestBody.username;
    await request(app).get(`/users/${username}`).expect(200);
  });

  it("should return 200 when a user is logged in", async () => {
    const createUserBody = mockCreateUserHttpRequest().body;
    await request(app).post("/users").send(createUserBody).expect(200);

    const loginUserBody = mockLoginUserHttpRequest().body;
    await request(app).post("/login").send(loginUserBody).expect(200);
  });
});
