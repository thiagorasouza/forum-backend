// import { Success } from "../../../core/success";
// import { InvalidParamFailure } from "../../../domain/userFailures";
// import { EmailAlreadyRegisteredFailure } from "../../failures/emailAlreadyRegisteredFailure";
// import { CreateUserHttpPresenter } from "../createUserHttpPresenter";
// import { CreateUserHttpView } from "../createUserHttpView";

import { Success } from "../../../core/success";
import { mockUserModel } from "../../../domain/tests/userModel.mock";
import { UserModel } from "../../../domain/userModel";
import { UserNotFoundFailure } from "../../shared/failures/userNotFoundFailure";
import { HttpView } from "../../shared/protocols/httpView";
import { GetUserByUsernameHttpPresenter } from "../getUserByUsernameHttpPresenter";

interface SutTypes {
  sut: GetUserByUsernameHttpPresenter;
  view: HttpView;
}

const makeView = (): HttpView => {
  class UserHttpViewMock implements HttpView {
    display(): void {
      return;
    }
  }

  return new UserHttpViewMock();
};

const makeSut = (): SutTypes => {
  const view = makeView();
  const sut = new GetUserByUsernameHttpPresenter(view);

  return { sut, view };
};

const successMock = new Success<UserModel>(mockUserModel());
const userNotFoundMock = new UserNotFoundFailure();

describe("CreateUserHttpPresenter", () => {
  it("should display 200 for success case", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(successMock);

    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 200,
      body: successMock.value,
    });
  });

  it("should display 404 if user is not found", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(userNotFoundMock);

    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 404,
      body: userNotFoundMock.error,
    });
  });

  // it("should display 400 if params are not valid", () => {
  //   const { sut, view } = makeSut();

  //   const viewSpy = jest.spyOn(view, "display");

  //   sut.format(invalidParamMock);

  //   expect(viewSpy).toHaveBeenCalledWith({
  //     statusCode: 400,
  //     body: invalidParamMock.error,
  //   });
  // });
});
