import { Result } from "../core/result";
import { CreateUserUseCase } from "./createUser";
import { UserRepository } from "./userRepository";

class UserRepositoryMock implements UserRepository {
  async getUserByEmail(email: string): Promise<any> {
    return Promise.resolve(Promise.resolve(Result.fail("User does not exist")));
  }
}

describe("CreateUser Test Suite", () => {
  it("should check if email is already registered", () => {
    const userRepository = new UserRepositoryMock();
    const sut = new CreateUserUseCase(userRepository);
    const getUserByEmailSpy = jest.spyOn(userRepository, "getUserByEmail");
    const request = {
      email: "valid_email",
      password: "valid_password",
    };
    sut.execute(request);
    expect(getUserByEmailSpy).toHaveBeenCalledTimes(1);
    expect(getUserByEmailSpy).toHaveBeenCalledWith(request.email);
  });
});
