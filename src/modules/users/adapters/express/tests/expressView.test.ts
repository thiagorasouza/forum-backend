import express, { Request, Response } from "express";
import request from "supertest";
import { CreateUserHttpViewModel } from "../../../useCases/createUser/createUserHttpViewModel";
import { ExpressView } from "../expressView";

const app = express();

const mockViewModel: CreateUserHttpViewModel = {
  statusCode: 200,
  body: "test",
};

describe("ExpressView Test Suite", () => {
  it("should return the correct HTTP status code", async () => {
    app.get("/test_status_code", (req: Request, res: Response): void => {
      const sut = new ExpressView(res);
      sut.display(mockViewModel);
    });

    await request(app).get("/test_status_code").expect(200);
  });

  it("should return JSON", async () => {
    app.get("/test_json", (req: Request, res: Response): void => {
      const sut = new ExpressView(res);
      sut.display(mockViewModel);
    });

    await request(app).get("/test_json").expect("content-type", /json/);
  });

  it("should return the correct body", async () => {
    app.get("/test_body", (req: Request, res: Response): void => {
      const sut = new ExpressView(res);
      sut.display(mockViewModel);
    });

    await request(app)
      .get("/test_body")
      .expect(JSON.stringify(mockViewModel.body));
  });
});
