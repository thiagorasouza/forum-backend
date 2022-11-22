import { CreateUserHttpController } from "../../useCases/createUser/createUserHttpController";
import { CreateUserHttpPresenter } from "../../useCases/createUser/createUserHttpPresenter";
import { CreateUserUseCase } from "../../useCases/createUser/createUserUseCase";
import { SequelizeUserRepository } from "../../adapters/sequelize/sequelizeUserRepository";
import { Response, Request } from "express";
import { ExpressView } from "./expressView";

export const createUserExpressHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const view = new ExpressView(res);
  const presenter = new CreateUserHttpPresenter(view);
  const repository = new SequelizeUserRepository();
  const useCase = new CreateUserUseCase(repository, presenter);
  const controller = new CreateUserHttpController(useCase);
  await controller.handle(req.body);
  return res.end();
};

// export const getUserByUsernameExpressHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const view = new ExpressView(res);
//   const presenter = new GetUserByUsername(view);
//   const repository = new SequelizeUserRepository();
//   const useCase = new GetUserByUsernameUseCase(repository, presenter);
//   const controller = new GetUserByUsernameHttpController(useCase);
//   await controller.handle(req.body);
//   return res.end();
// };
