import { Success } from "../../../core/success";
import { CreateUserUseCase } from "../createUserUseCase";
import { UserNotFoundFailure } from "../createUserFailures";
import { CreateUserPresenter } from "../createUserPresenter";
import {
  CreateUserRepository,
  GetByEmailResponse,
  SaveResponse,
} from "../createUserRepository";

const makeRepository = (): CreateUserRepository => {
  class CreateUserRepositoryMock implements CreateUserRepository {
    async create(): Promise<SaveResponse> {
      return new Success<string>("User saved");
    }
    async getByEmail(): Promise<GetByEmailResponse> {
      return new UserNotFoundFailure();
    }
  }

  return new CreateUserRepositoryMock();
};

const makePresenter = (): CreateUserPresenter => {
  class CreateUserPresenteMock implements CreateUserPresenter {
    format(): void {
      return;
    }
  }

  return new CreateUserPresenteMock();
};

interface SutTypes {
  sut: CreateUserUseCase;
  repository: CreateUserRepository;
  presenter: CreateUserPresenter;
}

export const makeCreateUserUseCase = (): SutTypes => {
  const repository = makeRepository();
  const presenter = makePresenter();
  const sut = new CreateUserUseCase(repository, presenter);

  return { sut, repository, presenter };
};
