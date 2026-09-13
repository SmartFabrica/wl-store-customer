export class ApiError extends Error {
  readonly status: number;
  readonly path: string;

  constructor(params: {
    message: string;
    status: number;
    path: string;
    cause?: unknown;
  }) {
    super(params.message, { cause: params.cause });
    this.name = "ApiError";
    this.status = params.status;
    this.path = params.path;
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;

export const toUserMessage = (error: unknown) => {
  if (isApiError(error) && error.status >= 400 && error.status < 500) {
    return error.message;
  }
  return "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.";
};
