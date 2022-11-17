import { Success } from "../core/success";
import { User } from "../domain/user";
import { CreateUserUseCase } from "./createUser";
import {
  EmailAlreadyRegisteredFailure,
  UserNotFoundFailure,
} from "./createUserFailures";
import { CreateUserPresenter } from "./createUserPresenter";
import {
  GetUserByEmailResponse,
  UserModel,
  CreateUserRepository,
} from "./createUserRepository";

const makeRepository = (): CreateUserRepository => {
  class CreateUserRepositoryMock implements CreateUserRepository {
    async getUserByEmail(): Promise<GetUserByEmailResponse> {
      return new UserNotFoundFailure();
    }
  }

  return new CreateUserRepositoryMock();
};

const makePresenter = (): CreateUserPresenter => {
  class CreateUserPresenteMock implements CreateUserPresenter {
    execute(): void {
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

const makeSut = (): SutTypes => {
  const repository = makeRepository();
  const presenter = makePresenter();
  const sut = new CreateUserUseCase(repository, presenter);

  return { sut, repository, presenter };
};

const requestMock = {
  email: "valid_email",
  password: "valid_password",
};

const responseMock = {
  email: "valid_email",
  password: "valid_password",
};

describe("CreateUserUseCase Test Suite", () => {
  beforeEach(() => {
    // jest.clearAllMocks();
  });

  it("should check if email is already registered", async () => {
    const { sut, repository } = makeSut();

    const getUserByEmailSpy = jest.spyOn(repository, "getUserByEmail");
    await sut.execute(requestMock);

    expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
    expect(getUserByEmailSpy).toHaveBeenCalledWith(requestMock.email);
  });

  it("should fail if email is already registered", async () => {
    const { sut, repository, presenter } = makeSut();

    const userExists = new Success<UserModel>(responseMock);

    jest
      .spyOn(repository, "getUserByEmail")
      .mockReturnValueOnce(Promise.resolve(userExists));
    const presenterSpy = jest.spyOn(presenter, "execute");

    await sut.execute(requestMock);

    const emailAlreadyRegistered = new EmailAlreadyRegisteredFailure();
    expect(presenterSpy).toHaveBeenCalledWith(emailAlreadyRegistered);
  });

  it("should try to build user entity", async () => {
    const { sut } = makeSut();

    const userCreateSpy = jest.spyOn(User, "create");

    await sut.execute(requestMock);

    expect(userCreateSpy).toHaveBeenCalledTimes(1);
    expect(userCreateSpy).toHaveBeenCalledWith(requestMock);
  });
});
