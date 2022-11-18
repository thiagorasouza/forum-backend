import { Success } from "../../../core/success";
import { User } from "../../../domain/user";
import { InvalidParamFailure } from "../../../domain/userFailures";
import { UserModel } from "../../../domain/userModel";
import {
  ServerFailure,
  EmailAlreadyRegisteredFailure,
} from "../createUserFailures";
import { makeCreateUserUseCase as makeSut } from "./createUserUseCase.mock";

const requestMock = {
  email: "valid_email",
  password: "valid_password",
};

const responseMock = {} as UserModel;

describe("CreateUserUseCase Test Suite", () => {
  it("should check if email is already registered", async () => {
    const { sut, repository } = makeSut();

    const getByEmail = jest.spyOn(repository, "getByEmail");
    await sut.execute(requestMock);

    expect(getByEmail).toHaveBeenCalledTimes(1);
    expect(getByEmail).toHaveBeenCalledWith(requestMock.email);
  });

  it("should fail if email is already registered", async () => {
    const { sut, repository, presenter } = makeSut();

    const userExists = new Success<UserModel>(responseMock);

    jest
      .spyOn(repository, "getByEmail")
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
