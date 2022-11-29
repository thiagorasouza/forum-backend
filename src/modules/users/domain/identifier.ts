export interface Identifier {
  generateRandomId(): string;
  isIdValid(id: string): boolean;
}
