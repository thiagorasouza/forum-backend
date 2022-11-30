import { CreateUserHttpController } from "../../useCases/createUser/createUserHttpController";
import { CreateUserUseCase } from "../../useCases/createUser/createUserUseCase";
import { SequelizeUserRepository } from "../sequelize/sequelizeUserRepository";
import { Response, Request } from "express";
import { ExpressView } from "./expressView";
import { CreateUserHttpPresenter } from "../../useCases/createUser/createUserHttpPresenter";
import { UUIDIdentifier } from "../uuid/uuidIdentifier";

export const createUserExpressHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("🚀 ~ req", req.body);
  const view = new ExpressView(res);
  const presenter = new CreateUserHttpPresenter(view);
  const identifier = new UUIDIdentifier();
  const repository = new SequelizeUserRepository(identifier);
  const useCase = new CreateUserUseCase(repository, presenter, identifier);
  const controller = new CreateUserHttpController(useCase);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
