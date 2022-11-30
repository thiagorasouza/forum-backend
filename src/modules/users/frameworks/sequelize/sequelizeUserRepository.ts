import { User } from "../../domain/user";
import { ExistingUserData, UserData } from "../../domain/userData";
import { UserModel } from "../../domain/userModel";
import { UserNotFoundFailure } from "../../useCases/shared/failures/userNotFoundFailure";
import {
  CreateUserRepository,
  CreateResponse,
  GetByEmailResponse,
} from "../../useCases/createUser/createUserRepository";
import { SequelizeUserModel } from "./models/sequelizeUserModel";
import {
  GetByUsernameResponse,
  GetUserByUsernameRepository,
} from "../../useCases/getUserByUsername/getUserByUsernameRepository";
import { UserFoundSuccess } from "../../useCases/shared/successes/userFoundSuccess";
import { UserCreatedSuccess } from "../../useCases/shared/successes/userCreatedSuccess";
import { Identifier } from "../../domain/identifier";

export class SequelizeUserRepository
  implements CreateUserRepository, GetUserByUsernameRepository
{
  constructor(private readonly identifier: Identifier) {}

  async create(userModel: UserModel): Promise<CreateResponse> {
    const userData = this.mapFromDomain(userModel);

    const sequelizeUserModel = SequelizeUserModel.build({ ...userData });
    await sequelizeUserModel.save();

    return new UserCreatedSuccess();
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
  }): Promise<UserNotFoundFailure | UserFoundSuccess> {
    const userData = await SequelizeUserModel.findOne({
      where: { [name]: value },
    });
    if (!userData) {
      return new UserNotFoundFailure();
    }

    const mapToDomainResult = this.mapToDomain(userData);

    const userModel = mapToDomainResult.value.props;
    return new UserFoundSuccess(userModel);
  }

  mapFromDomain(userModel: UserModel): UserData {
    return {
      id: userModel.id.value,
      username: userModel.username.value,
      email: userModel.email.value,
      password: userModel.password.value,
    };
  }

  mapToDomain(userData: ExistingUserData) {
    return User.from(userData);
  }
}
