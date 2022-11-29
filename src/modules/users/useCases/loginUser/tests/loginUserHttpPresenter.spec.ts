import { InvalidPasswordFailure } from "../../shared/failures/invalidPasswordFailure";
import { ServerFailure } from "../../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../../shared/failures/userNotFoundFailure";
import { HttpView } from "../../shared/protocols/httpView";
import { UserLoggedInSuccess } from "../../shared/successes/userLoggedInSuccess";
import { LoginUserHttpPresenter } from "../loginUserHttpPresenter";

interface SutTypes {
  sut: LoginUserHttpPresenter;
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
  const sut = new LoginUserHttpPresenter(view);

  return { sut, view };
};

const successMock = new UserLoggedInSuccess("any_token");
const userNotFoundMock = new UserNotFoundFailure();
const invalidPassword = new InvalidPasswordFailure();
const serverFailureMock = new ServerFailure();

describe("LoginUserHttpPresenter Test Suite", () => {
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

  it("should display 400 if password is not valid", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(invalidPassword);
    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 400,
      body: invalidPassword.error,
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
