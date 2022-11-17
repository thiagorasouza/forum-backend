import { Success } from "../core/success";
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

describe("CreateUserUseCase Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should check if email is already registered", async () => {
    const { sut, repository } = makeSut();

    const getUserByEmailSpy = jest.spyOn(repository, "getUserByEmail");
    const request = {
      email: "valid_email",
      password: "valid_password",
    };
    await sut.execute(request);

    expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
    expect(getUserByEmailSpy).toHaveBeenCalledWith(request.email);
  });

  it("should fail if email is already registered", async () => {
    const { sut, repository, presenter } = makeSut();

    // const userDoesNotExist = Result.fail<void>("User does not exist");
    const userExists = new Success<UserModel>({
      email: "valid_email",
      password: "valid_password",
    });

    jest
      .spyOn(repository, "getUserByEmail")
      .mockReturnValueOnce(Promise.resolve(userExists));
    const presenterSpy = jest.spyOn(presenter, "execute");

    const request = {
      email: "valid_email",
      password: "valid_password",
    };
    await sut.execute(request);

    const emailAlreadyRegistered = new EmailAlreadyRegisteredFailure();
    expect(presenterSpy).toHaveBeenCalledWith(emailAlreadyRegistered);
  });
});
