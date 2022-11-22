import express, { Response, Request } from "express";
import request from "supertest";
import { CreateUserHttpController } from "../../../useCases/createUser/createUserHttpController";
import { mockCreateUserHttpRequest } from "../../../useCases/createUser/tests/createUserHttpRequest.mock";
import { createUserExpressHandler } from "../expressHandlers";

const app = express();
app.use(express.json());

describe("CreateUserExpressHandler Test Suite", () => {
  it("should call controller handler with request object ", async () => {
    const handleSpy = jest.spyOn(CreateUserHttpController.prototype, "handle");

    app.post("/test_handler", createUserExpressHandler);

    const mockRequest = mockCreateUserHttpRequest();
    await request(app).post("/test_handler").send(mockRequest);

    expect(handleSpy).toHaveBeenCalledTimes(1);
    // expect(handleSpy.mock.calls[0].body);
  });

  it("should end with the response", async () => {
    const mockRequest = mockCreateUserHttpRequest();

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
