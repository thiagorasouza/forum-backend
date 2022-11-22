export interface Controller {
  handle(request: unknown): Promise<void>;
}
