// src/store/wallet.ts
// Wallet state store.

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { walletAPI } from "@/api/wallet";
import {
  WalletSummary,
  FundWalletRequest,
  FundWalletResponse,
  Transaction,
  TransactionListRequest,
  ListState,
} from "@/types";

interface WalletStore {
  // State
  summary: WalletSummary | null;
  transactions: ListState<Transaction>;
  fundingInProgress: boolean;
  fundingError: string | null;
  summaryLoading: boolean;
  summaryError: string | null;

  // Actions - Summary
  fetchSummary: () => Promise<void>;
  getBalance: () => Promise<{ balance: number; currency: string }>;

  // Actions - Transactions
  fetchTransactions: (params?: TransactionListRequest) => Promise<void>;
  getTransactionById: (transactionId: string) => Promise<Transaction>;

  // Actions - Funding
  fundWallet: (data: FundWalletRequest) => Promise<FundWalletResponse>;
  verifyFunding: (reference: string) => Promise<Transaction>;

  // Actions - Utilities
  clearErrors: () => void;
  refreshSummary: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

export const useWalletStore = create<WalletStore>()(
  devtools((set, get) => ({
    summary: null,
    transactions: {
      items: [],
      total: 0,
      page: 1,
      perPage: 20,
      hasMore: false,
      isLoading: false,
      error: null,
    },
    fundingInProgress: false,
    fundingError: null,
    summaryLoading: false,
    summaryError: null,

    fetchSummary: async () => {
      set({ summaryLoading: true, summaryError: null });
      try {
        const summary = await walletAPI.getSummary();
        set({ summary, summaryLoading: false });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch wallet summary";
        set({ summaryError: message, summaryLoading: false });
        throw error;
      }
    },

    getBalance: async () => {
      try {
        return await walletAPI.getBalance();
      } catch (error) {
        throw error;
      }
    },

    fetchTransactions: async (params?: TransactionListRequest) => {
      set((state) => ({
        transactions: { ...state.transactions, isLoading: true, error: null },
      }));
      try {
        const response = await walletAPI.getTransactions(params);
        set((state) => ({
          transactions: {
            ...state.transactions,
            items: response.items,
            total: response.total,
            page: response.page,
            perPage: response.perPage,
            hasMore: response.hasMore,
            isLoading: false,
          },
        }));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch transactions";
        set((state) => ({
          transactions: { ...state.transactions, error: message, isLoading: false },
        }));
        throw error;
      }
    },

    getTransactionById: async (transactionId: string) => {
      try {
        return await walletAPI.getTransactionById(transactionId);
      } catch (error) {
        throw error;
      }
    },

    fundWallet: async (data: FundWalletRequest) => {
      set({ fundingInProgress: true, fundingError: null });
      try {
        const result = await walletAPI.fund(data);
        set({ fundingInProgress: false });
        // Refresh summary and transactions after funding
        await get().refreshSummary();
        await get().refreshTransactions();
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fund wallet";
        set({ fundingError: message, fundingInProgress: false });
        throw error;
      }
    },

    verifyFunding: async (reference: string) => {
      try {
        const transaction = await walletAPI.verifyFunding(reference);
        // Refresh data after verification
        await get().refreshSummary();
        await get().refreshTransactions();
        return transaction;
      } catch (error) {
        throw error;
      }
    },

    clearErrors: () => {
      set((state) => ({
        transactions: { ...state.transactions, error: null },
        fundingError: null,
        summaryError: null,
      }));
    },

    refreshSummary: async () => {
      await get().fetchSummary();
    },

    refreshTransactions: async () => {
      await get().fetchTransactions();
    },
  })),
  { name: "WalletStore" }
);
