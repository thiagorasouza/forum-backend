import { mockExistingUserData } from "../../../domain/tests/mocks/userData.mock";
import { mockUserModel } from "../../../domain/tests/mocks/userModel.mock";
import { InvalidParamFailure } from "../../shared/failures/invalidParamFailure";
import { ServerFailure } from "../../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../../shared/failures/userNotFoundFailure";
import { HttpView } from "../../shared/protocols/httpView";
import { UserFoundSuccess } from "../../shared/successes/userFoundSuccess";
import { GetUserByUsernameHttpPresenter } from "../getUserByUsernameHttpPresenter";

interface SutTypes {
  sut: GetUserByUsernameHttpPresenter;
  view: HttpView;
}

const makeView = (): HttpView => {
  class HttpViewMock implements HttpView {
    display(): void {
      return;
    }
  }

  return new HttpViewMock();
};

const makeSut = (): SutTypes => {
  const view = makeView();
  const sut = new GetUserByUsernameHttpPresenter(view);

  return { sut, view };
};

const successMock = new UserFoundSuccess(mockUserModel());
const userNotFoundMock = new UserNotFoundFailure();
const invalidParamMock = new InvalidParamFailure("any_param");
const serverFailureMock = new ServerFailure();

/*
  export type GetUserByUsernameResponseModel =
  | UserFoundSuccess
  | UserNotFoundFailure
  | UserFailures
  | ServerFailure;
*/

describe("CreateUserHttpPresenter", () => {
  it("should display 200 with user info for success case", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(successMock);

    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 200,
      body: mockExistingUserData(),
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

  it("should display 400 if params are not valid", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(invalidParamMock);

    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 400,
      body: invalidParamMock.error,
    });
  });

  it("should display 500 for server failures", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(serverFailureMock);

    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 500,
      body: serverFailureMock.error,
    });
  });
});
