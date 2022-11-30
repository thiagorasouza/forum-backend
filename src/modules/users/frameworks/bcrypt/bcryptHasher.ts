import * as bcrypt from "bcrypt";
import { Hasher } from "../../domain/hasher";

export class BcryptHasher implements Hasher {
  public constructor(private readonly saltRounds: number) {}

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}
