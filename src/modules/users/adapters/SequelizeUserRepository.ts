import { Failure } from "../core/failure";
import { Success } from "../core/success";
import { UserModel } from "../domain/userModel";
import {
  CreateUserRepository,
  CreateResponse,
  GetByEmailResponse,
} from "../useCases/createUser/createUserRepository";
import { SequelizeUserModel } from "./SequelizeUserModel";

export class SequelizeUserRepository implements CreateUserRepository {
  async create(userModel: UserModel): Promise<CreateResponse> {
    const sequelizeUserModel = SequelizeUserModel.build({
      email: userModel.email.value,
      password: userModel.password.value,
    });

    sequelizeUserModel.save();

    const userCreated = SequelizeUserModel.findOne({
      where: {
        email: sequelizeUserModel.email,
      },
    });

    if (!userCreated) {
      return new Failure<string>("Unable to save user");
    } else {
      return new Success<string>("User saved");
    }
  }

  async getByEmail(): Promise<GetByEmailResponse> {
    return new Failure<string>("fail");
  }
}
