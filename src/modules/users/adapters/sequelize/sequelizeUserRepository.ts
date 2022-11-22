import { Success } from "../../core/success";
import { User } from "../../domain/user";
import { UserData } from "../../domain/userData";
import { UserModel } from "../../domain/userModel";
import { UserNotFoundFailure } from "../../useCases/createUser/createUserFailures";
import {
  CreateUserRepository,
  CreateResponse,
  GetByEmailResponse,
} from "../../useCases/createUser/createUserRepository";
import { InconsistentDataFailure } from "./sequelizeUserFailures";
import { SequelizeUserModel } from "./sequelizeUserModel";

export class SequelizeUserRepository implements CreateUserRepository {
  async create(userModel: UserModel): Promise<CreateResponse> {
    const userData = SequelizeUserRepository.mapFromDomain(userModel);

    const sequelizeUserModel = SequelizeUserModel.build(userData);
    await sequelizeUserModel.save();

    return new Success<string>("User saved");
  }

  async getByEmail(email: string): Promise<GetByEmailResponse> {
    const userData = await SequelizeUserModel.findOne({
      where: { email },
    });
    if (!userData) {
      return new UserNotFoundFailure();
    }

    const mapResult = SequelizeUserRepository.mapToDomain(userData);
    if (!mapResult.ok) {
      return new InconsistentDataFailure();
    }

    const userModel = mapResult.value.props;
    return new Success<UserModel>(userModel);
  }

  static mapFromDomain(userModel: UserModel) {
    return {
      name: userModel.name,
      email: userModel.email.value,
      password: userModel.password.value,
    };
  }

  static mapToDomain(userData: UserData) {
    return User.create(userData);
  }
}
