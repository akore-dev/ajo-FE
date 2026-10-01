// src/api/index.ts
// Export all API modules for easier imports

export { apiClient } from "./client";
export { authAPI } from "./auth";
export { circlesAPI } from "./circles";
export { walletAPI } from "./wallet";

// Re-export commonly used types
export type { ApiResponse, PaginatedResponse, ApiPaginationParams } from "@/types";
