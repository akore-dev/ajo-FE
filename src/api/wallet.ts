// src/api/wallet.ts
// Wallet and transaction endpoints.

import { apiClient } from "./client";
import {
  WalletSummary,
  FundWalletRequest,
  FundWalletResponse,
  Transaction,
  TransactionListRequest,
  PaginatedResponse,
} from "@/types";

export const walletAPI = {
  // Wallet summary
  getSummary: async (): Promise<WalletSummary> => {
    return apiClient.get<WalletSummary>("/wallet");
  },

  getBalance: async (): Promise<{ balance: number; currency: string }> => {
    return apiClient.get<{ balance: number; currency: string }>("/wallet/balance");
  },

  // Funding wallet
  fund: async (data: FundWalletRequest): Promise<FundWalletResponse> => {
    return apiClient.post<FundWalletResponse>("/wallet/fund", data);
  },

  verifyFunding: async (reference: string): Promise<Transaction> => {
    return apiClient.post<Transaction>("/wallet/verify-funding", { reference });
  },

  // Transactions
  getTransactions: async (params?: TransactionListRequest): Promise<PaginatedResponse<Transaction>> => {
    return apiClient.get<PaginatedResponse<Transaction>>("/wallet/transactions", { query: params });
  },

  getTransactionById: async (transactionId: string): Promise<Transaction> => {
    return apiClient.get<Transaction>(`/wallet/transactions/${transactionId}`);
  },

  exportTransactions: async (format: "csv" | "pdf" = "csv"): Promise<Blob> => {
    const response = await fetch(`/api/wallet/transactions/export?format=${format}`, {
      headers: {
        Authorization: `Bearer ${apiClient.getAuthToken()}`,
      },
    });
    return response.blob();
  },
};
