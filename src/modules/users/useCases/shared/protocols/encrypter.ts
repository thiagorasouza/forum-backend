export interface EncrypterPayload {
  sub: string;
  username: string;
  email: string;
}

export interface Encrypter {
  encrypt(payload: EncrypterPayload): Promise<string>;
}
