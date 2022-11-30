import { Success } from "../../../core/success";
import { InvalidPasswordFailure } from "../failures/invalidPasswordFailure";

export type CompareResult = Success<string> | InvalidPasswordFailure;

export interface HashComparer {
  // hash(password: string): string;
  compare(value: string, hash: string): Promise<CompareResult>;
}
