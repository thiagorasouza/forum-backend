import { LoginUserUseCase } from "../../loginUserUseCase";
import { LoginUserPresenter } from "../../loginUserPresenter";
import {
  GetByEmailResponse,
  LoginUserRepository,
} from "../../loginUserRepository";
import { UserFoundSuccess } from "../../../shared/successes/userFoundSuccess";
import { mockUserModel } from "../../../../domain/tests/userModel.mock";
import { CompareResult, Hasher } from "../../../shared/protocols/hasher";
import { Success } from "../../../../core/success";

const makeLoginUserPresenter = (): LoginUserPresenter => {
  class LoginUserPresenterStub implements LoginUserPresenter {
    format(): void {
      return;
    }
  }

  return new LoginUserPresenterStub();
};

const makeLoginUserRepository = (): LoginUserRepository => {
  class LoginUserRepositoryStub implements LoginUserRepository {
    async getByEmail(): Promise<GetByEmailResponse> {
      const userModel = mockUserModel();
      return new UserFoundSuccess(userModel);
    }
  }

  return new LoginUserRepositoryStub();
};

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async compare(): Promise<CompareResult> {
      return new Success("Valid password");
    }
  }

  return new HasherStub();
};

interface SutTypes {
  sut: LoginUserUseCase;
  presenter: LoginUserPresenter;
  repository: LoginUserRepository;
  hasher: Hasher;
}

export const makeLoginUserUseCase = (): SutTypes => {
  const hasher = makeHasher();
  const repository = makeLoginUserRepository();
  const presenter = makeLoginUserPresenter();
  const sut = new LoginUserUseCase(presenter, repository, hasher);
  return { sut, presenter, repository, hasher };
};
