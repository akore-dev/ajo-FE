// src/api/auth.ts
// Authentication endpoints.

import { apiClient } from "./client";
import { AuthResponse, LoginRequest, RegisterRequest, User } from "@/types";

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/login", credentials);
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/register", data);
  },

  logout: async (): Promise<void> => {
    await apiClient.post<void>("/auth/logout");
    apiClient.clearAuth();
  },

  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>("/auth/me");
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiClient.put<User>("/auth/profile", data);
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    return apiClient.put<void>("/auth/change-password", { oldPassword, newPassword });
  },
};
