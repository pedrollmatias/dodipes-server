export interface UseCase<IInput, IOutput> {
  handle(input?: IInput): Promise<IOutput> | IOutput;
}
