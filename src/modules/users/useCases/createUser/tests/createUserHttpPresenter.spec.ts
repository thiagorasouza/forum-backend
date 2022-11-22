import { Success } from "../../../core/success";
import { InvalidParamFailure } from "../../../domain/userFailures";
import { EmailAlreadyRegisteredFailure } from "../../failures/emailAlreadyRegisteredFailure";
import { CreateUserHttpPresenter } from "../createUserHttpPresenter";
import { UserHttpView } from "../../protocols/userHttpView";

interface SutTypes {
  sut: CreateUserHttpPresenter;
  view: UserHttpView;
}

const makeView = (): UserHttpView => {
  class CreateUserHttpViewMock implements UserHttpView {
    display(): void {
      return;
    }
  }

  return new CreateUserHttpViewMock();
};

const makeSut = (): SutTypes => {
  const view = makeView();
  const sut = new CreateUserHttpPresenter(view);

  return { sut, view };
};

const successMock = new Success<string>("success");
const emailAlreadyRegisteredMock = new EmailAlreadyRegisteredFailure();
const invalidParamMock = new InvalidParamFailure("any");

describe("CreateUserHttpPresenter", () => {
  it("should display 200 for success case", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(successMock);

    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 200,
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
});
