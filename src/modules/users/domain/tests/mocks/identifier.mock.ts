import { Identifier } from "../../identifier";

export const mockIdentifier = (): Identifier => {
  class IdentifierStub implements Identifier {
    generateRandomId(): string {
      return "random_id";
    }

    isIdValid(): boolean {
      return true;
    }
  }

  return new IdentifierStub();
};
