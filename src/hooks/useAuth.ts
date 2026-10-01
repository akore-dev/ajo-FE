// src/hooks/useAuth.ts
// Authentication hook with auth store integration.

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { LoginRequest, RegisterRequest } from "@/types";

export const useAuth = () => {
  const authStore = useAuthStore();

  // Restore session on mount
  useEffect(() => {
    authStore.restoreSession().catch(() => {
      // Session restore failed, user is not authenticated
    });
  }, [authStore]);

  return {
    user: authStore.user,
    token: authStore.token,
    isLoading: authStore.isLoading,
    error: authStore.error,
    isAuthenticated: !!authStore.user && !!authStore.token,

    // Methods
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    refreshUser: authStore.refreshUser,
    clearError: authStore.clearError,
  };
};

// Hook for login form
export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  return {
    mutate: login,
    isLoading,
    error,
  };
};

// Hook for register form
export const useRegisterMutation = () => {
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  return {
    mutate: register,
    isLoading,
    error,
  };
};

// Hook for logout
export const useLogoutMutation = () => {
  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);

  return {
    mutate: logout,
    isLoading,
  };
};
