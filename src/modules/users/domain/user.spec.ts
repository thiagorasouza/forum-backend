import { UserEmailInterface } from "./interfaces/userEmailInterface";
import { User } from "./user";

const makeUserEmail = (mockValue: string): UserEmailInterface => {
  class UserEmailMock implements UserEmailInterface {
    get value(): string {
      return mockValue;
    }
  }

  return new UserEmailMock();
};

describe("User Test Suite", () => {
  it("should fail to create a user with an empty email", () => {
    const userEmail = makeUserEmail("");

    const userProps = {
      email: userEmail,
      password: "valid_password",
    };
    const result = User.create(userProps);

    expect(result.ok).toBe(false);
    expect(result.error).toBe("Empty email");
  });

  it("should fail to create a user with an empty password", () => {
    const userEmail = makeUserEmail("valid_email@email.com");

    const userProps = {
      email: userEmail,
      password: "",
    };
    const result = User.create(userProps);

    expect(result.ok).toBe(false);
    expect(result.error).toBe("Empty password");
  });
});
