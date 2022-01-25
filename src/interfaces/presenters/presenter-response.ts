export interface PresenterResponse<PayloadType> {
  statusCode: number;
  message?: string;
  payload: PayloadType;
}
