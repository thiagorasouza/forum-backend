import { Success } from "../../../core/success";
import { CreateUserHttpPresenter } from "../createUserHttpPresenter";
import { CreateUserHttpView } from "../createUserHttpView";

// export type CreateUserResponseModel =
//   | Success<string>
//   | EmailAlreadyRegisteredFailure
//   | UserFailures;

// const makeViewModel = (): CreateUserHttpViewModel => {
//   class CreateUserHttpResponseMock implements CreateUserHttpViewModel {
//     constructor(
//       public readonly statusCode: number,
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       public readonly body: any
//     ) {}
//   }

//   return new CreateUserHttpResponseMock(200, "success");
// };

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

const successResponseMock = new Success<string>("User created");

describe("CreateUserHttpPresenter", () => {
  it("should display 200 for success case", () => {
    const { sut, view } = makeSut();

    const viewSpy = jest.spyOn(view, "display");

    sut.format(successResponseMock);

    expect(viewSpy).toHaveBeenCalledWith({
      statusCode: 200,
    });
  });
});
