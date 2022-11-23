import { mockUserModel } from "../../../../domain/tests/userModel.mock";
import { UserFoundSuccess } from "../../../shared/successes/userFoundSuccess";
import { GetUserByUsernamePresenter } from "../../getUserByUsernamePresenter";
import {
  GetByUsernameResponse,
  GetUserByUsernameRepository,
} from "../../getUserByUsernameRepository";
import { GetUserByUsernameUseCase } from "../../getUserByUsernameUseCase";

const makeRepository = (): GetUserByUsernameRepository => {
  class GetUserByUsernameRepositoryMock implements GetUserByUsernameRepository {
    async getByUsername(): Promise<GetByUsernameResponse> {
      const userModel = mockUserModel();
      return new UserFoundSuccess(userModel);
    }
  }

  return new GetUserByUsernameRepositoryMock();
};

const makePresenter = (): GetUserByUsernamePresenter => {
  class GetUserByUsernamePresenterMock implements GetUserByUsernamePresenter {
    format(): void {
      return;
    }
  }

  return new GetUserByUsernamePresenterMock();
};

interface SutTypes {
  sut: GetUserByUsernameUseCase;
  repository: GetUserByUsernameRepository;
  presenter: GetUserByUsernamePresenter;
}

export const mockGetUserByUsernameUseCase = (): SutTypes => {
  const repository = makeRepository();
  const presenter = makePresenter();
  const sut = new GetUserByUsernameUseCase(repository, presenter);

  return { sut, repository, presenter };
};
