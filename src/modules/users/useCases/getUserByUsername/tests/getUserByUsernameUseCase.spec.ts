// import { Success } from "../../../core/success";
// import { User } from "../../../domain/user";
// import { InvalidParamFailure } from "../../../domain/userFailures";
// import { UserModel } from "../../../domain/userModel";
// import {
//   ServerFailure,
//   EmailAlreadyRegisteredFailure,
// } from "../createUserFailures";
// import { mockCreateUserRequestModel } from "./createUserRequestModel.mock";

import { Success } from "../../../core/success";
import { mockUserModel } from "../../../domain/tests/userModel.mock";
import { UserModel } from "../../../domain/userModel";
import { UserNotFoundFailure } from "../../failures/userNotFoundFailure";
import { mockGetUserByUsernameRequestModel } from "./getUserByUsernameRequestModel.mock";
import { mockGetUserByUsernameUseCase as makeSut } from "./getUserByUsernameUseCase.mock";

// import { makeCreateUserUseCase as makeSut } from "./createUserUseCase.mock";

// const responseMock = {} as UserModel;

describe("GetUserByUsernameUseCase Test Suite", () => {
  // it("should check if email is already registered", async () => {
  //   const { sut, repository } = makeSut();
  //   const requestMock = mockCreateUserRequestModel();
  //   const getByEmail = jest.spyOn(repository, "getByEmail");
  //   await sut.execute(requestMock);
  //   expect(getByEmail).toHaveBeenCalledTimes(1);
  //   expect(getByEmail).toHaveBeenCalledWith(requestMock.email);
  // });
  it("should present UserNotFoundFailure if username is not registered", async () => {
    const { sut, repository, presenter } = makeSut();
    const requestModel = mockGetUserByUsernameRequestModel();
    const userNotFound = new UserNotFoundFailure();
    jest
      .spyOn(repository, "getByUsername")
      .mockReturnValueOnce(Promise.resolve(userNotFound));
    const presenterSpy = jest.spyOn(presenter, "format");

    await sut.execute(requestModel);

    expect(presenterSpy).toHaveBeenCalledWith(userNotFound);
  });

  // it("should succeed if user is registered", async () => {
  //   const { sut } = makeSut();
  //   const requestMock = mockCreateUserRequestModel();
  //   const userCreateSpy = jest.spyOn(User, "create");
  //   await sut.execute(requestMock);
  //   expect(userCreateSpy).toHaveBeenCalledTimes(1);
  //   expect(userCreateSpy).toHaveBeenCalledWith(requestMock);
  // });
  // it("should fail if building User entity fails", async () => {
  //   const { sut, presenter } = makeSut();
  //   const requestMock = mockCreateUserRequestModel();
  //   const invalidParamFailure = new InvalidParamFailure("any");
  //   jest.spyOn(User, "create").mockReturnValueOnce(invalidParamFailure);
  //   const presenterSpy = jest.spyOn(presenter, "format");
  //   await sut.execute(requestMock);
  //   expect(presenterSpy).toHaveBeenCalledWith(invalidParamFailure);
  // });
  // it("should save user if email does not exist and User entity is created", async () => {
  //   const { sut, repository } = makeSut();
  //   const requestMock = mockCreateUserRequestModel();
  //   const userMock = { props: {} } as User;
  //   jest.spyOn(User, "create").mockReturnValueOnce(new Success<User>(userMock));
  //   const saveSpy = jest.spyOn(repository, "create");
  //   await sut.execute(requestMock);
  //   expect(saveSpy).toHaveBeenCalledTimes(1);
  //   expect(saveSpy).toHaveBeenCalledWith(userMock.props);
  // });
  // it("should fail if saving user throws an error", async () => {
  //   const { sut, repository, presenter } = makeSut();
  //   const requestMock = mockCreateUserRequestModel();
  //   const userMock = { props: {} } as User;
  //   jest.spyOn(User, "create").mockReturnValueOnce(new Success<User>(userMock));
  //   jest
  //     .spyOn(repository, "create")
  //     .mockReturnValueOnce(Promise.reject(new Error()));
  //   const presenterSpy = jest.spyOn(presenter, "format");
  //   await sut.execute(requestMock);
  //   expect(presenterSpy).toHaveBeenCalledWith(new ServerFailure());
  // });
  // it("should succeed if everything went well", async () => {
  //   const { sut, presenter } = makeSut();
  //   const requestMock = mockCreateUserRequestModel();
  //   const userMock = { props: {} } as User;
  //   jest.spyOn(User, "create").mockReturnValueOnce(new Success<User>(userMock));
  //   const presenterSpy = jest.spyOn(presenter, "format");
  //   await sut.execute(requestMock);
  //   const userCreated = new Success<string>("User created");
  //   expect(presenterSpy).toHaveBeenCalledWith(userCreated);
  // });
});
