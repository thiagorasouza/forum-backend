import * as jwt from "jsonwebtoken";
import {
  Encrypter,
  EncrypterPayload,
} from "../../useCases/shared/protocols/encrypter";

export class JWTEncrypter implements Encrypter {
  constructor(private readonly jwtSecret: string) {}

  async encrypt(payload: EncrypterPayload): Promise<string> {
    jwt.sign(payload, this.jwtSecret);
    return "";
  }
}
