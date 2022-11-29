import * as uuid from "uuid";
import { Identifier } from "../../domain/identifier";

export class UUIDIdentifier implements Identifier {
  generateRandomId(): string {
    return uuid.v4();
  }

  isIdValid(id: string): boolean {
    return uuid.validate(id);
  }
}
