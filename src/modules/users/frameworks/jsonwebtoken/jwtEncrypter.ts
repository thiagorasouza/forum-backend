import * as jwt from "jsonwebtoken";
import {
  Encrypter,
  EncrypterPayload,
} from "../../useCases/shared/protocols/encrypter";

export class JWTEncrypter implements Encrypter {
  constructor(private readonly jwtSecret: string) {}

  encrypt(payload: EncrypterPayload): string {
    return jwt.sign(payload, this.jwtSecret);
  }
}
