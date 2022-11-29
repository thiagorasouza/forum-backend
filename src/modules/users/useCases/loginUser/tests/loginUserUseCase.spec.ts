import { Guard } from "../../../core/guard";
import { mockLoginUserRequestModel } from "./mocks/loginUserRequestModel.mock";
import { makeLoginUserUseCase as makeSut } from "./mocks/loginUserUseCase.mock";

describe("LoginUserUseCase Test Suite", () => {
  it("should call Guard.againstNullOrUndefined", async () => {
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
});
