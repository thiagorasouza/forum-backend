import { Guard } from "../../../core/guard";
import { Success } from "../../../core/success";
import { mockUserModel } from "../../../domain/tests/userModel.mock";
import { UserModel } from "../../../domain/userModel";
import { MissingParamFailure } from "../../shared/failures/missingParamFailure";
import { ServerFailure } from "../../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../../shared/failures/userNotFoundFailure";
import { mockGetUserByUsernameRequestModel } from "./mocks/getUserByUsernameRequestModel.mock";
import { mockGetUserByUsernameUseCase as makeSut } from "./mocks/getUserByUsernameUseCase.mock";

describe("GetUserByUsernameUseCase Test Suite", () => {
  it("should call Guard.againstNullOrUndefined", async () => {
    const { sut } = makeSut();

    const guardSpy = jest.spyOn(Guard, "againstNullOrUndefined");

    const requestModel = mockGetUserByUsernameRequestModel();
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

    const requestModel = mockGetUserByUsernameRequestModel();
    sut.execute(requestModel);

    expect(presenterSpy).toHaveBeenCalledWith(missingParam);
  });

  it("should fail if retrieving username fails", async () => {
    const { sut, repository, presenter } = makeSut();

    const userNotFound = new UserNotFoundFailure();
    jest
      .spyOn(repository, "getByUsername")
      .mockReturnValueOnce(Promise.resolve(userNotFound));
    const presenterSpy = jest.spyOn(presenter, "format");

    const requestModel = mockGetUserByUsernameRequestModel();
    await sut.execute(requestModel);

    expect(presenterSpy).toHaveBeenCalledWith(userNotFound);
  });

  it("should succeed if retrieving username succeeds", async () => {
    const { sut, presenter } = makeSut();

    const presenterSpy = jest.spyOn(presenter, "format");

    const userModel = mockUserModel();
    const userExists = new Success<UserModel>(userModel);

    const requestModel = mockGetUserByUsernameRequestModel();
    await sut.execute(requestModel);

    expect(presenterSpy).toHaveBeenCalledWith(userExists);
  });

  it("should fail with ServerError if repository throws", async () => {
    const { sut, repository, presenter } = makeSut();

    jest
      .spyOn(repository, "getByUsername")
      .mockReturnValueOnce(Promise.reject(new Error()));
    const presenterSpy = jest.spyOn(presenter, "format");

    const requestModel = mockGetUserByUsernameRequestModel();
    await sut.execute(requestModel);

    expect(presenterSpy).toHaveBeenCalledWith(new ServerFailure());
  });
});
