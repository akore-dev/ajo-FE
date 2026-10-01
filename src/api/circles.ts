// src/api/circles.ts
// Circle management endpoints.

import { apiClient } from "./client";
import {
  Circle,
  CreateCircleRequest,
  JoinCircleRequest,
  ContributeRequest,
  CircleListRequest,
  PaginatedResponse,
  Transaction,
} from "@/types";

export const circlesAPI = {
  // Fetch circles
  list: async (params?: CircleListRequest): Promise<PaginatedResponse<Circle>> => {
    return apiClient.get<PaginatedResponse<Circle>>("/circles", { query: params });
  },

  getById: async (circleId: string): Promise<Circle> => {
    return apiClient.get<Circle>(`/circles/${circleId}`);
  },

  myCircles: async (params?: CircleListRequest): Promise<PaginatedResponse<Circle>> => {
    return apiClient.get<PaginatedResponse<Circle>>("/circles/my-circles", { query: params });
  },

  // Create and manage circles
  create: async (data: CreateCircleRequest): Promise<Circle> => {
    return apiClient.post<Circle>("/circles", data);
  },

  join: async (data: JoinCircleRequest): Promise<Circle> => {
    return apiClient.post<Circle>("/circles/join", data);
  },

  update: async (circleId: string, data: Partial<CreateCircleRequest>): Promise<Circle> => {
    return apiClient.put<Circle>(`/circles/${circleId}`, data);
  },

  leave: async (circleId: string): Promise<void> => {
    return apiClient.post<void>(`/circles/${circleId}/leave`);
  },

  // Contributions
  contribute: async (data: ContributeRequest): Promise<Transaction> => {
    return apiClient.post<Transaction>("/circles/contribute", data);
  },

  getContributionHistory: async (
    circleId: string,
    params?: { page?: number; perPage?: number }
  ): Promise<PaginatedResponse<Transaction>> => {
    return apiClient.get<PaginatedResponse<Transaction>>(`/circles/${circleId}/contributions`, { query: params });
  },

  // Payouts
  getPayoutSchedule: async (circleId: string): Promise<Array<{ memberId: string; cycleNumber: number }>> => {
    return apiClient.get<Array<{ memberId: string; cycleNumber: number }>>(`/circles/${circleId}/payout-schedule`);
  },

  initiateInitiatePayout: async (circleId: string): Promise<Transaction> => {
    return apiClient.post<Transaction>(`/circles/${circleId}/initiate-payout`);
  },
};
