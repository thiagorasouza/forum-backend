import { EmailAlreadyRegisteredFailure } from "../../shared/failures/emailAlreadyRegisteredFailure";
import { InvalidParamFailure } from "../../shared/failures/invalidParamFailure";
import { ServerFailure } from "../../shared/failures/serverFailure";
import { HttpView } from "../../shared/protocols/httpView";
import { UserCreatedSuccess } from "../../shared/successes/userCreatedSuccess";
import { CreateUserHttpPresenter } from "../createUserHttpPresenter";

interface SutTypes {
  sut: CreateUserHttpPresenter;
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
  const sut = new CreateUserHttpPresenter(view);

  return { sut, view };
};

const successMock = new UserCreatedSuccess();
const emailAlreadyRegisteredMock = new EmailAlreadyRegisteredFailure();
const invalidParamMock = new InvalidParamFailure("any_param");
const serverFailureMock = new ServerFailure();

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
