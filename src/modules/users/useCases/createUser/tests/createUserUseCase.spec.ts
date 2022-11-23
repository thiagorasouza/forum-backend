import { Success } from "../../../core/success";
import { User } from "../../../domain/user";
import { InvalidParamFailure } from "../../shared/failures/invalidParamFailure";
import { UserModel } from "../../../domain/userModel";
import { EmailAlreadyRegisteredFailure } from "../../shared/failures/emailAlreadyRegisteredFailure";
import { ServerFailure } from "../../shared/failures/serverFailure";
import { mockCreateUserRequestModel } from "./mocks/createUserRequestModel.mock";
import { makeCreateUserUseCase as makeSut } from "./mocks/createUserUseCase.mock";
import { Guard } from "../../../core/guard";
import { MissingParamFailure } from "../../shared/failures/missingParamFailure";
import { UserCreatedSuccess } from "../../shared/successes/userCreatedSuccess";
import { UserFoundSuccess } from "../../shared/successes/userFoundSuccess";

const responseMock = {} as UserModel;

describe("CreateUserUseCase Test Suite", () => {
  it("should call Guard.againstNullOrUndefined", async () => {
    const { sut } = makeSut();

    const guardSpy = jest.spyOn(Guard, "againstNullOrUndefined");

    const requestModel = mockCreateUserRequestModel();
    sut.execute(requestModel);

    expect(guardSpy).toHaveBeenCalledTimes(1);
    expect(guardSpy).toHaveBeenCalledWith(
      requestModel,
      Object.keys(requestModel)
    );
  });

  it("should fail if Guard.againstNullOrUndefined fails", async () => {
    const { sut, presenter } = makeSut();

    const missingParam = new MissingParamFailure("any_field");
    jest
      .spyOn(Guard, "againstNullOrUndefined")
      .mockReturnValueOnce(missingParam);
    const presenterSpy = jest.spyOn(presenter, "format");

    const requestModel = mockCreateUserRequestModel();
    sut.execute(requestModel);

    expect(presenterSpy).toHaveBeenCalledWith(missingParam);
  });

  it("should check if email is already registered", async () => {
    const { sut, repository } = makeSut();
    const requestMock = mockCreateUserRequestModel();

    const getByEmail = jest.spyOn(repository, "getByEmail");
    await sut.execute(requestMock);

    expect(getByEmail).toHaveBeenCalledTimes(1);
    expect(getByEmail).toHaveBeenCalledWith(requestMock.email);
  });

  it("should fail if email is already registered", async () => {
    const { sut, repository, presenter } = makeSut();
    const requestMock = mockCreateUserRequestModel();

    const userExists = new UserFoundSuccess(responseMock);

    jest
      .spyOn(repository, "getByEmail")
      .mockReturnValueOnce(Promise.resolve(userExists));
    const presenterSpy = jest.spyOn(presenter, "format");

    await sut.execute(requestMock);

    const emailAlreadyRegistered = new EmailAlreadyRegisteredFailure();
    expect(presenterSpy).toHaveBeenCalledWith(emailAlreadyRegistered);
  });

  it("should create User entity with correct values", async () => {
    const { sut } = makeSut();
    const requestMock = mockCreateUserRequestModel();

    const userCreateSpy = jest.spyOn(User, "create");

    await sut.execute(requestMock);

    expect(userCreateSpy).toHaveBeenCalledTimes(1);
    expect(userCreateSpy).toHaveBeenCalledWith(requestMock);
  });

  it("should fail if building User entity fails", async () => {
    const { sut, presenter } = makeSut();
    const requestMock = mockCreateUserRequestModel();

    const invalidParamFailure = new InvalidParamFailure("any");

    jest.spyOn(User, "create").mockReturnValueOnce(invalidParamFailure);
    const presenterSpy = jest.spyOn(presenter, "format");

    await sut.execute(requestMock);

    expect(presenterSpy).toHaveBeenCalledWith(invalidParamFailure);
  });

  it("should save user if email does not exist and User entity is created", async () => {
    const { sut, repository } = makeSut();
    const requestMock = mockCreateUserRequestModel();

    const userMock = { props: {} } as User;
    jest.spyOn(User, "create").mockReturnValueOnce(new Success<User>(userMock));
    const saveSpy = jest.spyOn(repository, "create");

    await sut.execute(requestMock);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(userMock.props);
  });

  it("should fail if saving user throws an error", async () => {
    const { sut, repository, presenter } = makeSut();
    const requestMock = mockCreateUserRequestModel();

    const userMock = { props: {} } as User;
    jest.spyOn(User, "create").mockReturnValueOnce(new Success<User>(userMock));
    jest
      .spyOn(repository, "create")
      .mockReturnValueOnce(Promise.reject(new Error()));
    const presenterSpy = jest.spyOn(presenter, "format");

    await sut.execute(requestMock);

    expect(presenterSpy).toHaveBeenCalledWith(new ServerFailure());
  });

  it("should succeed if everything went well", async () => {
    const { sut, presenter } = makeSut();
    const requestMock = mockCreateUserRequestModel();

    const userMock = { props: {} } as User;
    jest.spyOn(User, "create").mockReturnValueOnce(new Success<User>(userMock));
    const presenterSpy = jest.spyOn(presenter, "format");

    await sut.execute(requestMock);

    const userCreated = new UserCreatedSuccess();
    expect(presenterSpy).toHaveBeenCalledWith(userCreated);
  });
});
