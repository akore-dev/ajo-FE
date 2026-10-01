// src/hooks/useCircles.ts
// Circles hooks for data fetching and mutations.

import { useEffect } from "react";
import { useCirclesStore } from "@/store/circles";
import { CreateCircleRequest, JoinCircleRequest, CircleListRequest } from "@/types";

// Hook for fetching my circles
export const useMyCircles = (params?: CircleListRequest) => {
  const store = useCirclesStore();

  useEffect(() => {
    store.fetchMyCircles(params).catch(() => {
      // Error handled in store
    });
  }, [store, params?.page, params?.perPage]);

  return {
    circles: store.myCircles.items,
    total: store.myCircles.total,
    page: store.myCircles.page,
    perPage: store.myCircles.perPage,
    hasMore: store.myCircles.hasMore,
    isLoading: store.myCircles.isLoading,
    error: store.myCircles.error,
    refresh: () => store.fetchMyCircles(params),
  };
};

// Hook for fetching single circle
export const useCircleDetail = (circleId: string) => {
  const store = useCirclesStore();

  useEffect(() => {
    if (circleId) {
      store.fetchCircleById(circleId).catch(() => {
        // Error handled in store
      });
    }
  }, [store, circleId]);

  return {
    circle: store.selectedCircle,
    isLoading: store.selectedCircleLoading,
    error: store.selectedCircleError,
    refresh: () => store.fetchCircleById(circleId),
  };
};

// Hook for create circle mutation
export const useCreateCircleMutation = () => {
  const store = useCirclesStore();

  return {
    mutate: store.createCircle,
    isLoading: store.myCircles.isLoading,
    error: store.myCircles.error,
  };
};

// Hook for join circle mutation
export const useJoinCircleMutation = () => {
  const store = useCirclesStore();

  return {
    mutate: store.joinCircle,
    isLoading: store.myCircles.isLoading,
    error: store.myCircles.error,
  };
};

// Hook for leave circle mutation
export const useLeaveCircleMutation = () => {
  const store = useCirclesStore();

  return {
    mutate: store.leaveCircle,
    isLoading: store.myCircles.isLoading,
    error: store.myCircles.error,
  };
};

// Hook for contribute mutation
export const useContributeMutation = () => {
  const store = useCirclesStore();

  return {
    mutate: store.contribute,
    isLoading: store.myCircles.isLoading,
    error: store.myCircles.error,
  };
};

// Hook for contribution history
export const useContributionHistory = (circleId: string, params?: { page?: number; perPage?: number }) => {
  const store = useCirclesStore();

  useEffect(() => {
    if (circleId) {
      store.getContributionHistory(circleId, params).catch(() => {
        // Error handled
      });
    }
  }, [store, circleId, params?.page, params?.perPage]);

  const fetchData = async () => {
    return store.getContributionHistory(circleId, params);
  };

  return {
    fetch: fetchData,
  };
};

// Hook that uses all circle data
export const useCircles = () => {
  const myCircles = useMyCircles();
  const clearSelectedCircle = useCirclesStore((state) => state.clearSelectedCircle);
  const clearErrors = useCirclesStore((state) => state.clearErrors);

  return {
    ...myCircles,
    clearSelectedCircle,
    clearErrors,
  };
};
