import { CreateUserHttpController } from "../../useCases/createUser/createUserHttpController";
import { CreateUserUseCase } from "../../useCases/createUser/createUserUseCase";
import { SequelizeUserRepository } from "../sequelize/sequelizeUserRepository";
import { Response, Request } from "express";
import { ExpressView } from "./expressView";
import { CreateUserHttpPresenter } from "../../useCases/createUser/createUserHttpPresenter";
import { UUIDIdentifier } from "../uuid/uuidIdentifier";
import { GetUserByUsernameHttpPresenter } from "../../useCases/getUserByUsername/getUserByUsernameHttpPresenter";
import { GetUserByUsernameUseCase } from "../../useCases/getUserByUsername/getUserByUsernameUseCase";
import { GetUserByUsernameHttpController } from "../../useCases/getUserByUsername/getUserByUsernameHttpController";
import { Controller } from "../../useCases/shared/protocols/controller";
import { View } from "../../useCases/shared/protocols/view";
import { BcryptHasher } from "../bcrypt/bcryptHasher";
import { config } from "../../../../main/config";

const getHandlerFromFactory = (factory: (view: View) => Controller) => {
  return async (req: Request, res: Response) => {
    const view = new ExpressView(res);
    const controller = factory(view);
    await controller.handle(req as any);
  };
};

const createUserControllerFactory = (view: View): CreateUserHttpController => {
  const presenter = new CreateUserHttpPresenter(view);
  const identifier = new UUIDIdentifier();
  const repository = new SequelizeUserRepository(identifier);
  const hasher = new BcryptHasher(config.saltRounds);
  const useCase = new CreateUserUseCase(
    repository,
    presenter,
    identifier,
    hasher
  );
  return new CreateUserHttpController(useCase);
};

export const getUserByUsernameFactory = (
  view: View
): GetUserByUsernameHttpController => {
  const presenter = new GetUserByUsernameHttpPresenter(view);
  const identifier = new UUIDIdentifier();
  const repository = new SequelizeUserRepository(identifier);
  const useCase = new GetUserByUsernameUseCase(repository, presenter);
  return new GetUserByUsernameHttpController(useCase);
};

export const createUserHandler = getHandlerFromFactory(
  createUserControllerFactory
);

export const getUserByUsernameHandler = getHandlerFromFactory(
  getUserByUsernameFactory
);
