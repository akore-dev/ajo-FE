// src/utils/errors.ts
// Error handling utilities.

import { APIException } from "@/types";

export class ValidationError extends Error {
  constructor(
    public field: string,
    public message: string
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Network error. Please check your connection.") {
    super(message);
    this.name = "NetworkError";
  }
}

// Get user-friendly error message
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof APIException) {
    // Map common API error codes to user-friendly messages
    const errorMap: Record<string, string> = {
      INVALID_CREDENTIALS: "Invalid email or password",
      USER_NOT_FOUND: "User not found",
      USER_ALREADY_EXISTS: "Email already registered",
      INVALID_TOKEN: "Session expired. Please log in again.",
      INSUFFICIENT_BALANCE: "Insufficient wallet balance",
      CIRCLE_FULL: "Circle is full. Cannot join.",
      CIRCLE_NOT_FOUND: "Circle not found",
      UNAUTHORIZED: "You don't have permission to perform this action",
      RATE_LIMITED: "Too many requests. Please try again later.",
      SERVER_ERROR: "Server error. Please try again later.",
    };

    return errorMap[error.code] || error.message || "An error occurred";
  }

  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof NetworkError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};

// Check if error is retriable
export const isRetriableError = (error: unknown): boolean => {
  if (error instanceof APIException) {
    // Retriable status codes: 408, 429, 500, 502, 503, 504
    return [408, 429, 500, 502, 503, 504].includes(error.statusCode);
  }

  if (error instanceof NetworkError) {
    return true;
  }

  return false;
};

// Format validation errors for forms
export const formatValidationErrors = (
  errors: Record<string, string>
): Record<string, { message: string }> => {
  return Object.entries(errors).reduce(
    (acc, [field, message]) => {
      acc[field] = { message };
      return acc;
    },
    {} as Record<string, { message: string }>
  );
};

// Check if error is authentication-related
export const isAuthError = (error: unknown): boolean => {
  if (error instanceof APIException) {
    return [
      "INVALID_CREDENTIALS",
      "INVALID_TOKEN",
      "UNAUTHORIZED",
      "USER_NOT_FOUND",
    ].includes(error.code);
  }
  return false;
};
