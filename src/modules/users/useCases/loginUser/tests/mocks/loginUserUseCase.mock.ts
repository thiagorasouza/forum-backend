import { LoginUserUseCase } from "../../loginUserUseCase";
import { LoginUserPresenter } from "../../loginUserPresenter";
import {
  GetByEmailResponse,
  LoginUserRepository,
} from "../../loginUserRepository";
import { UserFoundSuccess } from "../../../shared/successes/userFoundSuccess";
import { mockUserModel } from "../../../../domain/tests/userModel.mock";

export const makeLoginUserPresenter = (): LoginUserPresenter => {
  class LoginUserPresenterStub implements LoginUserPresenter {
    format(): void {
      return;
    }
  }

  return new LoginUserPresenterStub();
};

export const makeLoginUserRepository = (): LoginUserRepository => {
  class LoginUserRepositoryStub implements LoginUserRepository {
    async getByEmail(): Promise<GetByEmailResponse> {
      const userModel = mockUserModel();
      return new UserFoundSuccess(userModel);
    }
  }

  return new LoginUserRepositoryStub();
};

interface SutTypes {
  sut: LoginUserUseCase;
  presenter: LoginUserPresenter;
  repository: LoginUserRepository;
}

export const makeLoginUserUseCase = (): SutTypes => {
  const repository = makeLoginUserRepository();
  const presenter = makeLoginUserPresenter();
  const sut = new LoginUserUseCase(presenter, repository);
  return { sut, presenter, repository };
};
