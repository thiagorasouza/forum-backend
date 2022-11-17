import { Result } from "../core/result";
import { CreateUserUseCase } from "./createUser";
import {
  GetUserByEmailResponse,
  UserModel,
  UserRepository,
} from "./userRepository";

const makeUserRepositoryMock = (): UserRepository => {
  class UserRepositoryMock implements UserRepository {
    async getUserByEmail(email: string): Promise<GetUserByEmailResponse> {
      return Result.fail<void>("User does not exist");
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
  it("should check if email is already registered", async () => {
    const { sut, userRepositoryMock } = makeSut();

    const getUserByEmailSpy = jest.spyOn(userRepositoryMock, "getUserByEmail");
    const request = {
      email: "valid_email",
      password: "valid_password",
    };
    await sut.execute(request);

    expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
    expect(getUserByEmailSpy).toHaveBeenCalledWith(request.email);
  });

  it("should fail if email is already registered", async () => {
    const { sut, userRepositoryMock } = makeSut();

    // const userDoesNotExist = Result.fail<void>("User does not exist");
    const userExists = Result.succeed<UserModel>({
      email: "valid_email",
      password: "valid_password",
    });

    jest
      .spyOn(userRepositoryMock, "getUserByEmail")
      .mockReturnValueOnce(Promise.resolve(userExists));

    const request = {
      email: "valid_email",
      password: "valid_password",
    };
    const result = await sut.execute(request);

    const emailAlreadyRegistered = Result.fail<void>(
      "Email already registered"
    );
    expect(result).toEqual(emailAlreadyRegistered);
  });
});
