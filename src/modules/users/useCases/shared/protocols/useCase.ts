export interface UseCase {
  execute(request: unknown): Promise<void>;
  toPresenter(response: unknown): void;
}
