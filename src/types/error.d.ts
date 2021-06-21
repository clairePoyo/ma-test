interface ApiError {
  errors: {
    description: string;
  };
  status: string;
  code: number;
  message: string;
}
