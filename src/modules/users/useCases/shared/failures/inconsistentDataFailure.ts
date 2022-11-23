import { Failure } from "../../../core/failure";

export class InconsistentDataFailure extends Failure<string> {
  constructor() {
    super("Inconsistent database data");
  }
}
