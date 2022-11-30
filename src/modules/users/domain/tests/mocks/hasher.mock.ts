import { Hasher } from "../../hasher";

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(): Promise<string> {
      return "hashed_password";
    }
  }

  return new HasherStub();
};
