import { CreateUserUseCase } from "../createUserUseCase";
import { CreateUserHttpController } from "../createUserHttpController";
import { makeCreateUserUseCase } from "./createUserUseCase.mock";
import { CreateUserHttpRequest } from "../createUserHttpRequest";
import { mockCreateUserDTO } from "./createUserDTO.mock";

interface SutTypes {
  useCase: CreateUserUseCase;
  sut: CreateUserHttpController;
}

const makeSut = (): SutTypes => {
  const { sut: useCase } = makeCreateUserUseCase();
  const sut = new CreateUserHttpController(useCase);

  return { sut, useCase };
};

describe("CreateUserHttpController Test Suite", () => {
  it("should execute CreateUserUseCase with correct values", () => {
    const { sut, useCase } = makeSut();

    const useCaseSpy = jest.spyOn(useCase, "execute");

    const createUserDTO = mockCreateUserDTO();

    const httpRequest: CreateUserHttpRequest = {
      body: createUserDTO,
    };
    sut.handle(httpRequest);

    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith(createUserDTO);
  });
});
