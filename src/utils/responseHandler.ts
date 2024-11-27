export const successResponse = (data: any, message = "Success") => ({
  status: "success",
  message,
  data,
});

export const errorResponse = (error: any, message = "Error") => ({
  status: "error",
  message,
  error,
});
