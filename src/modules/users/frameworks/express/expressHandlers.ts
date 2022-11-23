import { CreateUserHttpController } from "../../useCases/createUser/createUserHttpController";
import { CreateUserUseCase } from "../../useCases/createUser/createUserUseCase";
import { SequelizeUserRepository } from "../sequelize/sequelizeUserRepository";
import { Response, Request } from "express";
import { ExpressView } from "./expressView";
import { CreateUserHttpPresenter } from "../../useCases/createUser/createUserHttpPresenter";

export const createUserExpressHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const view = new ExpressView(res);
  const presenter = new CreateUserHttpPresenter(view);
  const repository = new SequelizeUserRepository();
  const useCase = new CreateUserUseCase(repository, presenter);
  const controller = new CreateUserHttpController(useCase);
  await controller.handle(req as any);
  // return res.end();
};

// export const getUserByUsernameExpressHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const view = new ExpressView(res);
//   const presenter = new HttpPresenter(view);
//   const repository = new SequelizeUserRepository();
//   const useCase = new GetUserByUsernameUseCase(repository, presenter);
//   const controller = new GetUserByUsernameHttpController(useCase);
//   await controller.handle(req as any);
//   return res.end();
// };
