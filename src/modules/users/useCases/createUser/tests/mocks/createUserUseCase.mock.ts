import { Success } from "../../../../core/success";
import { CreateUserUseCase } from "../../createUserUseCase";
import { UserNotFoundFailure } from "../../../shared/failures/userNotFoundFailure";
import { CreateUserPresenter } from "../../createUserPresenter";
import {
  CreateUserRepository,
  GetByEmailResponse,
  CreateResponse,
} from "../../createUserRepository";
import { mockIdentifier } from "../../../../domain/tests/mocks/identifier.mock";
import { Identifier } from "../../../../domain/identifier";
import { mockHasher } from "../../../../domain/tests/mocks/hasher.mock";
import { Hasher } from "../../../../domain/hasher";

const makeRepository = (): CreateUserRepository => {
  class CreateUserRepositoryMock implements CreateUserRepository {
    async create(): Promise<CreateResponse> {
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
  identifier: Identifier;
  hasher: Hasher;
}

export const makeCreateUserUseCase = (): SutTypes => {
  const repository = makeRepository();
  const presenter = makePresenter();
  const identifier = mockIdentifier();
  const hasher = mockHasher();
  const sut = new CreateUserUseCase(repository, presenter, identifier, hasher);

  return { sut, repository, presenter, identifier, hasher };
};
