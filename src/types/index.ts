// src/types/index.ts
// Shared domain types and API types.

// ============= DOMAIN MODELS =============

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export type CircleCategory = "family" | "friends" | "community" | "other";
export type CircleStatus = "active" | "recruiting" | "completed";

export interface CircleMember {
  id: string;
  name: string;
  avatarUrl?: string;
  position: number; // payout order, 1-indexed
  hasPaidThisCycle: boolean;
  joinedAt?: string;
}

export interface Circle {
  id: string;
  name: string;
  category: CircleCategory;
  status: CircleStatus;
  memberCount: number;
  capacity: number;
  contributionAmount: number; // in kobo
  currency: string;
  cadence: "weekly" | "monthly";
  currentCycle: number;
  totalCycles: number;
  membersPaidThisCycle: number;
  poolTotal: number;
  poolTarget: number;
  nextPayoutMemberName: string;
  nextPayoutAmount: number;
  cyclesUntilYourTurn: number;
  yourPosition: number;
  members: CircleMember[];
  createdAt?: string;
  description?: string;
}

export type TransactionType = "payout" | "contribution" | "wallet_funding" | "transfer";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number; // in kobo
  currency: string;
  date: string; // ISO date string
  status: TransactionStatus;
  reference?: string;
  balanceAfter?: number;
  counterpartyAvatarUrl?: string;
}

export interface WalletSummary {
  availableBalance: number;
  currency: string;
  monthDelta: number;
  contributedThisMonth: number;
  payoutReceivedThisMonth: number;
}

export type PaymentMethodId = "paystack" | "flutterwave" | "bank_transfer";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  description: string;
  iconName: "card" | "bank";
}

export type NavRoute = "home" | "circles" | "wallet" | "more";

// ============= API REQUEST/RESPONSE TYPES =============

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}

export interface ApiPaginationParams {
  page?: number;
  perPage?: number;
}

// ============= AUTH TYPES =============

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// ============= CIRCLE TYPES =============

export interface CreateCircleRequest {
  name: string;
  description?: string;
  category: CircleCategory;
  capacity: number;
  contributionAmount: number;
  cadence: "weekly" | "monthly";
  totalCycles: number;
}

export interface JoinCircleRequest {
  circleId: string;
}

export interface ContributeRequest {
  circleId: string;
  amount: number;
}

export interface CircleListRequest extends ApiPaginationParams {
  status?: CircleStatus;
  category?: CircleCategory;
  search?: string;
}

// ============= WALLET TYPES =============

export interface FundWalletRequest {
  amount: number; // in kobo
  paymentMethodId: PaymentMethodId;
}

export interface FundWalletResponse {
  transaction: Transaction;
  checkoutUrl?: string; // for Paystack redirect
  reference?: string;
}

export interface WalletTransaction extends Transaction {
  walletId: string;
}

export interface TransactionListRequest extends ApiPaginationParams {
  type?: TransactionType;
  status?: TransactionStatus;
  fromDate?: string;
  toDate?: string;
}

// ============= ERROR TYPES =============

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

export class APIException extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    public details?: Record<string, unknown>,
    message?: string
  ) {
    super(message || code);
    this.name = "APIException";
  }
}

// ============= STATE MANAGEMENT TYPES =============

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ListState<T> extends LoadingState {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}
