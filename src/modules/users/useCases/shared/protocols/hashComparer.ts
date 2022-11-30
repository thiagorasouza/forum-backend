export interface HashComparer {
  compare(rawPassword: string, hashedPassword: string): Promise<boolean>;
}
