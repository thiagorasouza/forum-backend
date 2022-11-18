import { Success } from "../core/success";
import { User } from "../domain/user";
import { InvalidParamFailure } from "../domain/userFailures";
import { UserModel } from "../domain/userModel";
import { CreateUserUseCase } from "./createUser";
import {
  ServerFailure,
  EmailAlreadyRegisteredFailure,
  UserNotFoundFailure,
} from "./createUserFailures";
import { CreateUserPresenter } from "./createUserPresenter";
import { CreateUserRepository, saveResponse } from "./createUserRepository";

const makeRepository = (): CreateUserRepository => {
  class CreateUserRepositoryMock implements CreateUserRepository {
    async save(): Promise<saveResponse> {
      return new Success<string>("User saved");
    }
    async getUserByEmail(): Promise<UserNotFoundFailure | Success<UserModel>> {
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

const responseMock = {} as UserModel;

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

  it("should create User entity with correct values", async () => {
    const { sut } = makeSut();

    const userCreateSpy = jest.spyOn(User, "create");

    await sut.execute(requestMock);

    expect(userCreateSpy).toHaveBeenCalledTimes(1);
    expect(userCreateSpy).toHaveBeenCalledWith(requestMock);
  });

  it("should fail if building User entity fails", async () => {
    const { sut, presenter } = makeSut();

    const invalidParamFailure = new InvalidParamFailure("any");

    jest.spyOn(User, "create").mockReturnValueOnce(invalidParamFailure);
    const presenterSpy = jest.spyOn(presenter, "execute");

    await sut.execute(requestMock);

    expect(presenterSpy).toHaveBeenCalledWith(invalidParamFailure);
  });

  it("should save user if email does not exist and User entity is created", async () => {
    const { sut, repository } = makeSut();

    const userMock = { props: {} } as User;
    jest.spyOn(User, "create").mockReturnValueOnce(new Success<User>(userMock));
    const saveSpy = jest.spyOn(repository, "save");

    await sut.execute(requestMock);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(userMock.props);
  });

  it("should fail if saving user throws an error", async () => {
    const { sut, repository, presenter } = makeSut();

    const userMock = { props: {} } as User;
    jest.spyOn(User, "create").mockReturnValueOnce(new Success<User>(userMock));
    jest
      .spyOn(repository, "save")
      .mockReturnValueOnce(Promise.reject(new Error()));
    const presenterSpy = jest.spyOn(presenter, "execute");

    await sut.execute(requestMock);

    expect(presenterSpy).toHaveBeenCalledWith(new ServerFailure());
  });

  it("should succeed if everything went well", async () => {
    const { sut, presenter } = makeSut();

    const userMock = { props: {} } as User;
    jest.spyOn(User, "create").mockReturnValueOnce(new Success<User>(userMock));
    const presenterSpy = jest.spyOn(presenter, "execute");

    await sut.execute(requestMock);

    const userCreated = new Success<string>("User created");
    expect(presenterSpy).toHaveBeenCalledWith(userCreated);
  });
});
