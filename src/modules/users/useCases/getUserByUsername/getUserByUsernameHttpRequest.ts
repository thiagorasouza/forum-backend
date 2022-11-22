export interface GetUserByUsernameDTO {
  username: string;
}

export interface GetUserByUsernameHttpRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: GetUserByUsernameDTO;
}
