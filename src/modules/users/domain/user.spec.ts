import { User } from "./user";
import { UserEmail } from "./userEmail";

describe("User Test Suite", () => {
  it("should check if email is valid on creation", () => {
    const userEmailCreate = jest.spyOn(UserEmail, "create");

    const userData = {
      email: "valid_email@email.com",
      password: "valid_password",
    };
    User.create(userData);

    expect(userEmailCreate).toHaveBeenCalledTimes(1);
    expect(userEmailCreate).toHaveBeenCalledWith("valid_email@email.com");
  });
  // it("should check if email is valid to create a user with an empty email", () => {
  //   const userEmail = {
  //     value: "",
  //   } as UserEmail;

  //   const userProps = {
  //     email: userEmail,
  //     password: "valid_password",
  //   };
  //   const result = User.create(userProps);

  //   expect(result.ok).toBe(false);
  //   expect(result.error).toBe("Empty email");
  // });

  // it("should fail to create a user with an empty password", () => {
  //   const userEmail = makeUserEmail("valid_email@email.com");

  //   const userProps = {
  //     email: userEmail,
  //     password: "",
  //   };
  //   const result = User.create(userProps);

  //   expect(result.ok).toBe(false);
  //   expect(result.error).toBe("Empty password");
  // });
});
