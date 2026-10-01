// src/hooks/useWallet.ts
// Wallet hooks for balance, transactions, and funding.

import { useEffect } from "react";
import { useWalletStore } from "@/store/wallet";
import { TransactionListRequest } from "@/types";

// Hook for wallet summary
export const useWalletSummary = () => {
  const store = useWalletStore();

  useEffect(() => {
    store.fetchSummary().catch(() => {
      // Error handled in store
    });
  }, [store]);

  return {
    summary: store.summary,
    isLoading: store.summaryLoading,
    error: store.summaryError,
    refresh: () => store.fetchSummary(),
  };
};

// Hook for wallet balance
export const useWalletBalance = () => {
  const store = useWalletStore();

  useEffect(() => {
    store.getBalance().catch(() => {
      // Error handled
    });
  }, [store]);

  const summary = store.summary;

  return {
    balance: summary?.availableBalance ?? 0,
    currency: summary?.currency ?? "₦",
    fetch: store.getBalance,
  };
};

// Hook for transactions
export const useWalletTransactions = (params?: TransactionListRequest) => {
  const store = useWalletStore();

  useEffect(() => {
    store.fetchTransactions(params).catch(() => {
      // Error handled in store
    });
  }, [store, params?.page, params?.perPage, params?.type]);

  return {
    transactions: store.transactions.items,
    total: store.transactions.total,
    page: store.transactions.page,
    perPage: store.transactions.perPage,
    hasMore: store.transactions.hasMore,
    isLoading: store.transactions.isLoading,
    error: store.transactions.error,
    refresh: () => store.fetchTransactions(params),
  };
};

// Hook for single transaction
export const useWalletTransaction = (transactionId: string) => {
  return {
    fetch: useWalletStore((state) => state.getTransactionById),
  };
};

// Hook for fund wallet mutation
export const useFundWalletMutation = () => {
  const store = useWalletStore();

  return {
    mutate: store.fundWallet,
    isLoading: store.fundingInProgress,
    error: store.fundingError,
  };
};

// Hook for verify funding mutation
export const useVerifyFundingMutation = () => {
  const store = useWalletStore();

  return {
    mutate: store.verifyFunding,
    isLoading: store.fundingInProgress,
    error: store.fundingError,
  };
};

// Hook that combines all wallet data
export const useWallet = () => {
  const summary = useWalletSummary();
  const transactions = useWalletTransactions();
  const clearErrors = useWalletStore((state) => state.clearErrors);

  return {
    summary: summary.summary,
    summaryLoading: summary.isLoading,
    summaryError: summary.error,
    refreshSummary: summary.refresh,

    transactions: transactions.transactions,
    transactionsLoading: transactions.isLoading,
    transactionsError: transactions.error,
    refreshTransactions: transactions.refresh,

    clearErrors,
  };
};
