// src/store/auth.ts
// Authentication state store.

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { authAPI } from "@/api/auth";
import { User, LoginRequest, RegisterRequest } from "@/types";
import { apiClient } from "@/api/client";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isLoading: false,
        error: null,

        login: async (credentials: LoginRequest) => {
          set({ isLoading: true, error: null });
          try {
            const { user, token, refreshToken } = await authAPI.login(credentials);
            apiClient.setAuthToken(token, refreshToken);
            set({ user, token, isLoading: false });
          } catch (error) {
            const message = error instanceof Error ? error.message : "Login failed";
            set({ error: message, isLoading: false });
            throw error;
          }
        },

        register: async (data: RegisterRequest) => {
          set({ isLoading: true, error: null });
          try {
            const { user, token, refreshToken } = await authAPI.register(data);
            apiClient.setAuthToken(token, refreshToken);
            set({ user, token, isLoading: false });
          } catch (error) {
            const message = error instanceof Error ? error.message : "Registration failed";
            set({ error: message, isLoading: false });
            throw error;
          }
        },

        logout: async () => {
          set({ isLoading: true });
          try {
            await authAPI.logout();
            set({ user: null, token: null, isLoading: false, error: null });
          } catch (error) {
            // Clear state even if logout call fails
            set({ user: null, token: null, isLoading: false });
          }
        },

        refreshUser: async () => {
          try {
            const user = await authAPI.getCurrentUser();
            set({ user });
          } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to refresh user";
            set({ error: message });
            throw error;
          }
        },

        setUser: (user: User | null) => {
          set({ user });
        },

        clearError: () => {
          set({ error: null });
        },

        restoreSession: async () => {
          const token = apiClient.getAuthToken();
          if (token) {
            set({ token });
            try {
              const user = await authAPI.getCurrentUser();
              set({ user });
            } catch {
              // Token invalid, clear auth
              apiClient.clearAuth();
              set({ token: null, user: null });
            }
          }
        },
      }),
      {
        name: "auth-store",
        partialize: (state) => ({ token: state.token, user: state.user }),
      }
    ),
    { name: "AuthStore" }
  )
);
