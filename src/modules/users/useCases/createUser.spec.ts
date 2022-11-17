import { Result } from "../core/result";
import { CreateUserUseCase } from "./createUser";
import { UserRepository } from "./userRepository";

const makeUserRepositoryMock = (): UserRepository => {
  class UserRepositoryMock implements UserRepository {
    async getUserByEmail(email: string): Promise<any> {
      return Promise.resolve(
        Promise.resolve(Result.fail("User does not exist"))
      );
    }
  }

  return new UserRepositoryMock();
};

interface SutTypes {
  sut: CreateUserUseCase;
  userRepositoryMock: UserRepository;
}

const makeSut = (): SutTypes => {
  const userRepositoryMock = makeUserRepositoryMock();
  const sut = new CreateUserUseCase(userRepositoryMock);

  return { sut, userRepositoryMock };
};

describe("CreateUserUseCase Test Suite", () => {
  it("should check if email is already registered", () => {
    const { sut, userRepositoryMock } = makeSut();
    const getUserByEmailSpy = jest.spyOn(userRepositoryMock, "getUserByEmail");
    const request = {
      email: "valid_email",
      password: "valid_password",
    };
    sut.execute(request);
    expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
    expect(getUserByEmailSpy).toHaveBeenCalledWith(request.email);
  });
});
