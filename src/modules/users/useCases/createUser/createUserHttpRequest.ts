export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface CreateUserHttpRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: CreateUserDTO;
}
