import { Success } from "../../../core/success";
import { InvalidParamFailure } from "../../../domain/userFailures";
import { EmailAlreadyRegisteredFailure } from "../createUserFailures";
import { CreateUserHttpPresenter } from "../createUserHttpPresenter";
import { CreateUserHttpView } from "../createUserHttpView";

interface SutTypes {
  sut: CreateUserHttpPresenter;
  view: CreateUserHttpView;
}

const makeView = (): CreateUserHttpView => {
  class CreateUserHttpViewMock implements CreateUserHttpView {
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
