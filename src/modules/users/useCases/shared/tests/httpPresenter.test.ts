import { Success } from "../../../core/success";
import { EmailAlreadyRegisteredFailure } from "../failures/emailAlreadyRegisteredFailure";
import { InvalidParamFailure } from "../failures/invalidParamFailure";
import { UserNotFoundFailure } from "../failures/userNotFoundFailure";
import { HttpPresenter } from "../httpPresenter";
import { HttpView } from "../protocols/httpView";

interface SutTypes {
  sut: HttpPresenter;
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
  const sut = new HttpPresenter(view);

  return { sut, view };
};

const successMock = new Success<string>("success");
const emailAlreadyRegisteredMock = new EmailAlreadyRegisteredFailure();
const invalidParamMock = new InvalidParamFailure("any");
const userNotFoundMock = new UserNotFoundFailure();

describe("CreateUserHttpPresenter", () => {
  it("should display 200 for success cases", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(successMock);

    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 200,
      body: successMock.value,
    });
  });

  it("should display 400 if email is already registered", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(emailAlreadyRegisteredMock);

    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 400,
      body: emailAlreadyRegisteredMock.error,
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

  it("should display 404 if user is not found", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(userNotFoundMock);

    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 404,
      body: userNotFoundMock.error,
    });
  });
});
