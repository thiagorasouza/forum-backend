import { Guard } from "../../../core/guard";
import { mockUserModel } from "../../../domain/tests/mocks/userModel.mock";
import { InvalidPasswordFailure } from "../../shared/failures/invalidPasswordFailure";
import { MissingParamFailure } from "../../shared/failures/missingParamFailure";
import { UserNotFoundFailure } from "../../shared/failures/userNotFoundFailure";
import { EncrypterPayload } from "../../shared/protocols/encrypter";
import { UserLoggedInSuccess } from "../../shared/successes/userLoggedInSuccess";
import { mockLoginUserRequestModel } from "./mocks/loginUserRequestModel.mock";
import { makeLoginUserUseCase as makeSut } from "./mocks/loginUserUseCase.mock";

describe("LoginUserUseCase Test Suite", () => {
  it("should call Guard.againstNullOrUndefined with correct values", async () => {
    const { sut } = makeSut();

    const guardSpy = jest.spyOn(Guard, "againstNullOrUndefined");

    const requestModel = mockLoginUserRequestModel();
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

    const requestModel = mockLoginUserRequestModel();
    sut.execute(requestModel);

    expect(presenterSpy).toHaveBeenCalledWith(missingParam);
  });

  it("should fail if email is not registered", async () => {
    const { sut, repository, presenter } = makeSut();

    const userNotFound = new UserNotFoundFailure();
    jest
      .spyOn(repository, "getByEmail")
      .mockReturnValueOnce(Promise.resolve(userNotFound));
    const presenterSpy = jest.spyOn(presenter, "format");

    const requestModel = mockLoginUserRequestModel();
    await sut.execute(requestModel);

    expect(presenterSpy).toHaveBeenCalledWith(userNotFound);
  });

  it("should call Hasher.compare with correct values", async () => {
    const { sut, hasher } = makeSut();

    const compareSpy = jest.spyOn(hasher, "compare");

    const requestModel = mockLoginUserRequestModel();
    await sut.execute(requestModel);

    const userModel = mockUserModel();

    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledWith(
      requestModel.password,
      userModel.password.value
    );
  });

  it("should fail if Hasher.compare fails", async () => {
    const { sut, hasher, presenter } = makeSut();

    const invalidPassword = new InvalidPasswordFailure();

    jest
      .spyOn(hasher, "compare")
      .mockReturnValueOnce(Promise.resolve(invalidPassword));
    const presenterSpy = jest.spyOn(presenter, "format");

    const requestModel = mockLoginUserRequestModel();
    await sut.execute(requestModel);

    expect(presenterSpy).toHaveBeenCalledWith(invalidPassword);
  });

  it("should call Encrypter with correct value", async () => {
    const { sut, encrypter } = makeSut();

    const encryptSpy = jest.spyOn(encrypter, "encrypt");

    const requestModel = mockLoginUserRequestModel();
    await sut.execute(requestModel);

    const userModel = mockUserModel();
    const payload: EncrypterPayload = {
      sub: userModel.id.value,
      email: userModel.email.value,
      username: userModel.username.value,
    };

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith(payload);
  });

  it("should return a token on success", async () => {
    const { sut, presenter } = makeSut();

    const presenterSpy = jest.spyOn(presenter, "format");

    const requestModel = mockLoginUserRequestModel();
    await sut.execute(requestModel);

    expect(presenterSpy).toHaveBeenCalledWith(new UserLoggedInSuccess("token"));
  });
});
