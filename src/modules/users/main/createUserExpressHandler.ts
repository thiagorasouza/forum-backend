import { CreateUserHttpController } from "../useCases/createUser/createUserHttpController";
import { CreateUserHttpPresenter } from "../useCases/createUser/createUserHttpPresenter";
import { CreateUserUseCase } from "../useCases/createUser/createUserUseCase";
import { SequelizeUserRepository } from "../adapters/sequelize/SequelizeUserRepository";
import { Response, Request } from "express";
import { ExpressHttpView } from "./ExpressHttpView";

export const createUserExpressHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const view = new ExpressHttpView(res);
  const presenter = new CreateUserHttpPresenter(view);
  const repository = new SequelizeUserRepository();
  const useCase = new CreateUserUseCase(repository, presenter);
  const controller = new CreateUserHttpController(useCase);
  await controller.handle(req.body);
  return res.end();
};
