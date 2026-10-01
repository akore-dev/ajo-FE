// src/api/client.ts
// Core HTTP client with interceptors, error handling, and auth.

import { ApiResponse, APIException } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const TOKEN_KEY = "ajo_auth_token";
const REFRESH_TOKEN_KEY = "ajo_refresh_token";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestConfig {
  method: RequestMethod;
  headers: Record<string, string>;
  body?: string;
}

interface ClientOptions {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean>;
}

class APIClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Get stored auth token
  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  // Store auth token
  private setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  }

  // Clear stored tokens
  private clearTokens(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  // Subscribe to token refresh
  private onRefreshed(token: string): void {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  // Add subscription for token refresh
  private addRefreshSubscriber(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback);
  }

  // Build query string
  private buildQueryString(query?: Record<string, string | number | boolean>): string {
    if (!query || Object.keys(query).length === 0) return "";
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    return `?${params.toString()}`;
  }

  // Build request headers
  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    const token = this.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  // Handle API errors
  private handleError(response: Response, data: unknown): never {
    let errorCode = "UNKNOWN_ERROR";
    let errorMessage = "An unexpected error occurred";
    let details: Record<string, unknown> | undefined;

    // Try to extract error details from response
    if (typeof data === "object" && data !== null) {
      const errorData = data as Record<string, unknown>;
      errorCode = (errorData.error || errorData.code || errorCode) as string;
      errorMessage = (errorData.message || errorMessage) as string;
      details = errorData.details as Record<string, unknown>;
    }

    throw new APIException(errorCode, response.status, details, errorMessage);
  }

  // Handle 401 Unauthorized
  private async handle401(): Promise<string | null> {
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.addRefreshSubscriber((token) => {
          resolve(token);
        });
      });
    }

    this.isRefreshing = true;
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        this.clearTokens();
        return null;
      }

      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return null;
      }

      const data = (await response.json()) as Record<string, unknown>;
      const newToken = (data.token || data.data?.token) as string | undefined;

      if (!newToken) {
        this.clearTokens();
        return null;
      }

      this.setToken(newToken);
      this.onRefreshed(newToken);
      return newToken;
    } finally {
      this.isRefreshing = false;
    }
  }

  // Core fetch method
  private async fetch<T>(
    endpoint: string,
    method: RequestMethod,
    options: ClientOptions = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}${this.buildQueryString(options.query)}`;
    const headers = this.buildHeaders(options.headers);

    let config: RequestConfig = { method, headers };
    if (method !== "GET" && method !== "HEAD") {
      config.body = JSON.stringify(options);
    }

    let response = await fetch(url, config);

    // Handle 401 with token refresh
    if (response.status === 401) {
      const newToken = await this.handle401();
      if (newToken) {
        const newHeaders = this.buildHeaders(options.headers);
        config = { ...config, headers: newHeaders };
        response = await fetch(url, config);
      }
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      // Response wasn't JSON
      if (!response.ok) {
        throw new APIException("INVALID_RESPONSE", response.status, undefined, response.statusText);
      }
      return null as T;
    }

    if (!response.ok) {
      this.handleError(response, data);
    }

    // Handle API response wrapper
    if (typeof data === "object" && data !== null && "success" in data) {
      const apiResponse = data as ApiResponse<T>;
      if (!apiResponse.success) {
        throw new APIException("API_ERROR", response.status, undefined, apiResponse.message || apiResponse.error);
      }
      return apiResponse.data as T;
    }

    return data as T;
  }

  // Public methods
  public async get<T>(endpoint: string, options?: ClientOptions): Promise<T> {
    return this.fetch<T>(endpoint, "GET", options);
  }

  public async post<T>(endpoint: string, body?: Record<string, unknown>, options?: ClientOptions): Promise<T> {
    return this.fetch<T>(endpoint, "POST", { ...options, ...body });
  }

  public async put<T>(endpoint: string, body?: Record<string, unknown>, options?: ClientOptions): Promise<T> {
    return this.fetch<T>(endpoint, "PUT", { ...options, ...body });
  }

  public async patch<T>(endpoint: string, body?: Record<string, unknown>, options?: ClientOptions): Promise<T> {
    return this.fetch<T>(endpoint, "PATCH", { ...options, ...body });
  }

  public async delete<T>(endpoint: string, options?: ClientOptions): Promise<T> {
    return this.fetch<T>(endpoint, "DELETE", options);
  }

  // Auth token management
  public setAuthToken(token: string, refreshToken?: string): void {
    this.setToken(token);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  public clearAuth(): void {
    this.clearTokens();
  }

  public getAuthToken(): string | null {
    return this.getToken();
  }
}

export const apiClient = new APIClient();
