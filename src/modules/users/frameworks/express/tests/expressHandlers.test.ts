import express, { Response, Request } from "express";
import request from "supertest";
import { CreateUserHttpController } from "../../../useCases/createUser/createUserHttpController";
import { mockCreateUserHttpRequest } from "../../../useCases/createUser/tests/mocks/createUserHttpRequest.mock";
import { SequelizeConnection } from "../../sequelize/sequelizeConnection";
import { SequelizeUserModel } from "../../sequelize/models/sequelizeUserModel";
import { createUserExpressHandler } from "../expressHandlers";

const app = express();
app.use(express.json());

describe("CreateUserExpressHandler Test Suite", () => {
  beforeAll(async () => {
    await SequelizeConnection.connect();
    await SequelizeUserModel.sync();
  });

  beforeEach(async () => {
    SequelizeUserModel.destroy({ truncate: true });
  });

  afterAll(async () => {
    await SequelizeConnection.disconnect();
  });

  it("should call controller handler with request object ", async () => {
    const handleSpy = jest.spyOn(CreateUserHttpController.prototype, "handle");

    app.post("/test_handler", createUserExpressHandler);

    const mockRequest = mockCreateUserHttpRequest();
    await request(app).post("/test_handler").send(mockRequest.body);

    expect(handleSpy).toHaveBeenCalledTimes(1);
    expect(handleSpy.mock.calls[0][0].body).toEqual(mockRequest.body);
  });

  it("should end with the response", async () => {
    const mockRequest = mockCreateUserHttpRequest();

    let resSpy;
    app.post(
      "/test_res_end",
      async (req: Request, res: Response): Promise<void> => {
        resSpy = jest.spyOn(res, "end");
        await createUserExpressHandler(req, res);
      }
    );

    await request(app).post("/test_res_end").send(mockRequest.body);

    expect(resSpy).toHaveBeenCalledTimes(1);
  });
});
