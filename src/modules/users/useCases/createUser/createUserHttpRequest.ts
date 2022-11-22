export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface CreateUserHttpRequest {
  body: CreateUserDTO;
}
