import { MissingParamFailure } from "../useCases/shared/failures/missingParamFailure";
import { Failure } from "./failure";
import { Success } from "./success";

export class Guard {
  public static againstNullOrUndefined(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: any,
    requiredFields: string[]
  ): Success<string> | Failure<string> {
    for (const field of requiredFields) {
      if (input[field] === null || input[field] === undefined) {
        return new MissingParamFailure(field);
      }
    }

    return new Success<string>("All fields are present");
  }
}
