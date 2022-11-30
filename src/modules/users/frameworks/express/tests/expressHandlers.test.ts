import express from "express";
import request from "supertest";
import { CreateUserHttpController } from "../../../useCases/createUser/createUserHttpController";
import { mockCreateUserHttpRequest } from "../../../useCases/createUser/tests/mocks/createUserHttpRequest.mock";
import { SequelizeConnection } from "../../sequelize/sequelizeConnection";
import { SequelizeUserModel } from "../../sequelize/models/sequelizeUserModel";
import { config } from "../../../../../main/config";
import { createUserHandler } from "../expressHandlers";

const app = express();
app.use(express.json());

describe("Express Handlers Test Suite", () => {
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

  describe("CreateUserExpressHandler", () => {
    it("should call controller handler with request object ", async () => {
      const handleSpy = jest.spyOn(
        CreateUserHttpController.prototype,
        "handle"
      );

      app.post("/test_handler", createUserHandler);

      const mockRequestBody = mockCreateUserHttpRequest().body;
      await request(app).post("/test_handler").send(mockRequestBody);

      expect(handleSpy).toHaveBeenCalledTimes(1);
      expect(handleSpy.mock.calls[0][0].body).toEqual(mockRequestBody);
    });
  });

  // describe("GetUserByUsernameExpressHandler", () => {});
});
