import express, { Response, Request } from "express";
import request from "supertest";
import { CreateUserHttpController } from "../../../useCases/createUser/createUserHttpController";
import { CreateUserHttpRequest } from "../../../useCases/createUser/createUserHttpRequest";
import { createUserExpressHandler } from "../expressHandlers";

const app = express();
app.use(express.json());

const mockRequest: CreateUserHttpRequest = {
  body: {
    email: "any_email@email.com",
    password: "any_password",
  },
};

describe("CreateUserExpressHandler Test Suite", () => {
  it("should call controller handler with request object ", async () => {
    const handleSpy = jest.spyOn(CreateUserHttpController.prototype, "handle");
    app.post("/test_handler", createUserExpressHandler);
    await request(app).post("/test_handler").send(mockRequest);
    expect(handleSpy).toHaveBeenCalledTimes(1);
    expect(handleSpy).toHaveBeenCalledWith(mockRequest);
  });

  it("should end with the response", async () => {
    let resSpy;
    app.post(
      "/test_res_end",
      (req: Request, res: Response): Promise<Response> => {
        resSpy = jest.spyOn(res, "end");
        return createUserExpressHandler(req, res);
      }
    );

    await request(app).post("/test_res_end").send(mockRequest);

    expect(resSpy).toHaveBeenCalledTimes(1);
  });
});
