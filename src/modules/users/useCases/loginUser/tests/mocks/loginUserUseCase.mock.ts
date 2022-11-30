import { LoginUserUseCase } from "../../loginUserUseCase";
import { LoginUserPresenter } from "../../loginUserPresenter";
import {
  GetByEmailResponse,
  LoginUserRepository,
} from "../../loginUserRepository";
import { UserFoundSuccess } from "../../../shared/successes/userFoundSuccess";
import { mockUserModel } from "../../../../domain/tests/mocks/userModel.mock";
import {
  CompareResult,
  HashComparer,
} from "../../../shared/protocols/hashComparer";
import { Success } from "../../../../core/success";
import { Encrypter } from "../../../shared/protocols/encrypter";

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

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(): Promise<CompareResult> {
      return new Success("Valid password");
    }
  }

  return new HashComparerStub();
};

const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(): Promise<string> {
      return "token";
    }
  }

  return new EncrypterStub();
};

interface SutTypes {
  sut: LoginUserUseCase;
  presenter: LoginUserPresenter;
  repository: LoginUserRepository;
  hashComparer: HashComparer;
  encrypter: Encrypter;
}

export const makeLoginUserUseCase = (): SutTypes => {
  const repository = makeLoginUserRepository();
  const presenter = makeLoginUserPresenter();
  const hashComparer = makeHashComparer();
  const encrypter = mockEncrypter();
  const sut = new LoginUserUseCase(
    presenter,
    repository,
    hashComparer,
    encrypter
  );
  return { sut, presenter, repository, hashComparer, encrypter };
};
