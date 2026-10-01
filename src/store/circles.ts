// src/store/circles.ts
// Circles state store.

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { circlesAPI } from "@/api/circles";
import {
  Circle,
  CreateCircleRequest,
  JoinCircleRequest,
  ContributeRequest,
  CircleListRequest,
  Transaction,
  ListState,
} from "@/types";

interface CirclesStore {
  // State
  myCircles: ListState<Circle>;
  availableCircles: ListState<Circle>;
  selectedCircle: Circle | null;
  selectedCircleLoading: boolean;
  selectedCircleError: string | null;

  // Actions - My Circles
  fetchMyCircles: (params?: CircleListRequest) => Promise<void>;
  fetchCircleById: (circleId: string) => Promise<void>;
  createCircle: (data: CreateCircleRequest) => Promise<Circle>;
  joinCircle: (data: JoinCircleRequest) => Promise<void>;
  leaveCircle: (circleId: string) => Promise<void>;

  // Actions - Contributions
  contribute: (data: ContributeRequest) => Promise<Transaction>;
  getContributionHistory: (
    circleId: string,
    params?: { page?: number; perPage?: number }
  ) => Promise<{ items: Transaction[] }>;

  // Actions - Utilities
  clearSelectedCircle: () => void;
  clearErrors: () => void;
  refreshMyCircles: () => Promise<void>;
}

export const useCirclesStore = create<CirclesStore>()(
  devtools((set, get) => ({
    myCircles: {
      items: [],
      total: 0,
      page: 1,
      perPage: 10,
      hasMore: false,
      isLoading: false,
      error: null,
    },
    availableCircles: {
      items: [],
      total: 0,
      page: 1,
      perPage: 10,
      hasMore: false,
      isLoading: false,
      error: null,
    },
    selectedCircle: null,
    selectedCircleLoading: false,
    selectedCircleError: null,

    fetchMyCircles: async (params?: CircleListRequest) => {
      set((state) => ({
        myCircles: { ...state.myCircles, isLoading: true, error: null },
      }));
      try {
        const response = await circlesAPI.myCircles(params);
        set((state) => ({
          myCircles: {
            ...state.myCircles,
            items: response.items,
            total: response.total,
            page: response.page,
            perPage: response.perPage,
            hasMore: response.hasMore,
            isLoading: false,
          },
        }));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch circles";
        set((state) => ({
          myCircles: { ...state.myCircles, error: message, isLoading: false },
        }));
        throw error;
      }
    },

    fetchCircleById: async (circleId: string) => {
      set({ selectedCircleLoading: true, selectedCircleError: null });
      try {
        const circle = await circlesAPI.getById(circleId);
        set({ selectedCircle: circle, selectedCircleLoading: false });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch circle";
        set({
          selectedCircleError: message,
          selectedCircleLoading: false,
        });
        throw error;
      }
    },

    createCircle: async (data: CreateCircleRequest) => {
      set((state) => ({
        myCircles: { ...state.myCircles, isLoading: true, error: null },
      }));
      try {
        const circle = await circlesAPI.create(data);
        set((state) => ({
          myCircles: {
            ...state.myCircles,
            items: [circle, ...state.myCircles.items],
            isLoading: false,
          },
        }));
        return circle;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create circle";
        set((state) => ({
          myCircles: { ...state.myCircles, error: message, isLoading: false },
        }));
        throw error;
      }
    },

    joinCircle: async (data: JoinCircleRequest) => {
      set((state) => ({
        myCircles: { ...state.myCircles, isLoading: true, error: null },
      }));
      try {
        const circle = await circlesAPI.join(data);
        set((state) => ({
          myCircles: {
            ...state.myCircles,
            items: [circle, ...state.myCircles.items],
            isLoading: false,
          },
          selectedCircle: circle,
        }));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to join circle";
        set((state) => ({
          myCircles: { ...state.myCircles, error: message, isLoading: false },
        }));
        throw error;
      }
    },

    leaveCircle: async (circleId: string) => {
      set((state) => ({
        myCircles: { ...state.myCircles, isLoading: true, error: null },
      }));
      try {
        await circlesAPI.leave(circleId);
        set((state) => ({
          myCircles: {
            ...state.myCircles,
            items: state.myCircles.items.filter((c) => c.id !== circleId),
            isLoading: false,
          },
          selectedCircle: state.selectedCircle?.id === circleId ? null : state.selectedCircle,
        }));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to leave circle";
        set((state) => ({
          myCircles: { ...state.myCircles, error: message, isLoading: false },
        }));
        throw error;
      }
    },

    contribute: async (data: ContributeRequest) => {
      try {
        const transaction = await circlesAPI.contribute(data);
        // Refresh the circle data to get updated pool amounts
        await get().fetchCircleById(data.circleId);
        return transaction;
      } catch (error) {
        throw error;
      }
    },

    getContributionHistory: async (circleId: string, params?: { page?: number; perPage?: number }) => {
      try {
        const response = await circlesAPI.getContributionHistory(circleId, params);
        return { items: response.items };
      } catch (error) {
        throw error;
      }
    },

    clearSelectedCircle: () => {
      set({ selectedCircle: null, selectedCircleError: null });
    },

    clearErrors: () => {
      set((state) => ({
        myCircles: { ...state.myCircles, error: null },
        availableCircles: { ...state.availableCircles, error: null },
        selectedCircleError: null,
      }));
    },

    refreshMyCircles: async () => {
      await get().fetchMyCircles();
    },
  })),
  { name: "CirclesStore" }
);
