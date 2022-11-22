import { Success } from "../../../core/success";
import { mockUserModel } from "../../../domain/tests/userModel.mock";
import { UserModel } from "../../../domain/userModel";
import { ServerFailure } from "../../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../../shared/failures/userNotFoundFailure";
import { mockGetUserByUsernameRequestModel } from "./getUserByUsernameRequestModel.mock";
import { mockGetUserByUsernameUseCase as makeSut } from "./getUserByUsernameUseCase.mock";

describe("GetUserByUsernameUseCase Test Suite", () => {
  it("should present UserNotFoundFailure if username is not registered", async () => {
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

  it("should succeed with UserModel if username registered", async () => {
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
