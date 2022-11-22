import { Success } from "../../core/success";
import { User } from "../../domain/user";
import { UserData } from "../../domain/userData";
import { UserModel } from "../../domain/userModel";
import { UserNotFoundFailure } from "../../useCases/shared/failures/userNotFoundFailure";
import {
  CreateUserRepository,
  CreateResponse,
  GetByEmailResponse,
} from "../../useCases/createUser/createUserRepository";
import { InconsistentDataFailure } from "./sequelizeUserFailures";
import { SequelizeUserModel } from "./sequelizeUserModel";
import {
  GetByUsernameResponse,
  GetUserByUsernameRepository,
} from "../../useCases/getUserByUsername/getUserByUsernameRepository";

export class SequelizeUserRepository
  implements CreateUserRepository, GetUserByUsernameRepository
{
  async create(userModel: UserModel): Promise<CreateResponse> {
    const userData = SequelizeUserRepository.mapFromDomain(userModel);

    const sequelizeUserModel = SequelizeUserModel.build({ ...userData });
    await sequelizeUserModel.save();

    return new Success<string>("User saved");
  }

  async getByEmail(email: string): Promise<GetByEmailResponse> {
    return await this.getByField({ fieldName: "email", fieldValue: email });
  }

  async getByUsername(username: string): Promise<GetByUsernameResponse> {
    return await this.getByField({
      fieldName: "username",
      fieldValue: username,
    });
  }

  private async getByField({
    fieldName: name,
    fieldValue: value,
  }: {
    fieldName: string;
    fieldValue: string;
  }): Promise<
    UserNotFoundFailure | InconsistentDataFailure | Success<UserModel>
  > {
    const userData = await SequelizeUserModel.findOne({
      where: { [name]: value },
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

  static mapFromDomain(userModel: UserModel): UserData {
    return {
      username: userModel.username.value,
      email: userModel.email.value,
      password: userModel.password.value,
    };
  }

  static mapToDomain(userData: UserData) {
    return User.create(userData);
  }
}
