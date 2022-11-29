import { Failure } from "../../../core/failure";
import { Success } from "../../../core/success";

export interface EncrypterPayload {
  sub: string;
  username: string;
  email: string;
}

export type EncryptResult = Success<string> | Failure<string>;

export interface Encrypter {
  encrypt(payload: EncrypterPayload): Promise<EncryptResult>;
}
