# AJO App - Backend Integration Implementation Guide

This guide explains how to use the production-ready API client, state management, and hooks to connect your frontend to the backend.

## 📁 Architecture Overview

```
src/
├── api/                    # API layer (HTTP client + endpoints)
│   ├── client.ts          # Core HTTP client with auth/interceptors
│   ├── auth.ts            # Auth endpoints
│   ├── circles.ts         # Circles endpoints
│   ├── wallet.ts          # Wallet endpoints
│   └── index.ts           # Exports
├── store/                 # State management (Zustand)
│   ├── auth.ts            # Auth store
│   ├── circles.ts         # Circles store
│   ├── wallet.ts          # Wallet store
│   └── index.ts           # Exports
├── hooks/                 # Custom hooks (data fetching + mutations)
│   ├── useAuth.ts         # Auth hooks
│   ├── useCircles.ts      # Circles hooks
│   ├── useWallet.ts       # Wallet hooks
│   └── index.ts           # Exports
└── utils/
    ├── errors.ts          # Error handling
    └── transform.ts       # Data transformations
```

## 🔌 Setup

### 1. Install Dependencies

```bash
npm install zustand
# Optional: for better debugging
npm install zustand@latest
```

**Already included (from original setup):**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### 2. Set Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

For production:

```env
NEXT_PUBLIC_API_URL=https://api.youromain.com/api
```

### 3. Wrap App with Providers

The root layout (`src/app/layout.tsx`) is already updated with `<Providers>`. This handles:
- Session restoration from localStorage
- Zustand hydration

## 🔐 Authentication

### Login Example

```tsx
"use client";

import { useState } from "react";
import { useLoginMutation } from "@/hooks";
import { getErrorMessage } from "@/utils/errors";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isLoading, error } = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // Automatically redirects after login (handled by router)
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
```

### Check Current User

```tsx
import { useAuth } from "@/hooks";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return <p>Not logged in</p>;

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

## 🏠 Circles

### Fetch My Circles

```tsx
import { useMyCircles } from "@/hooks";

export function CirclesList() {
  const { circles, isLoading, error, refresh } = useMyCircles();

  if (isLoading) return <p>Loading circles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={refresh}>Refresh</button>
      {circles.map((circle) => (
        <div key={circle.id}>
          <h3>{circle.name}</h3>
          <p>{circle.memberCount} members</p>
        </div>
      ))}
    </div>
  );
}
```

### Get Single Circle Details

```tsx
import { useCircleDetail } from "@/hooks";

export function CircleDetail({ circleId }: { circleId: string }) {
  const { circle, isLoading, error } = useCircleDetail(circleId);

  if (isLoading) return <p>Loading...</p>;
  if (!circle) return <p>Circle not found</p>;

  return (
    <div>
      <h1>{circle.name}</h1>
      <p>Status: {circle.status}</p>
      <p>Next payout: {circle.nextPayoutMemberName}</p>
      <p>{circle.membersPaidThisCycle}/{circle.capacity} paid this cycle</p>
    </div>
  );
}
```

### Create Circle

```tsx
import { useCreateCircleMutation } from "@/hooks";
import { CreateCircleRequest } from "@/types";

export function CreateCircleForm() {
  const { mutate: createCircle, isLoading, error } = useCreateCircleMutation();

  const handleSubmit = async (data: CreateCircleRequest) => {
    try {
      const newCircle = await createCircle(data);
      console.log("Circle created:", newCircle);
      // Navigate to new circle
    } catch (err) {
      console.error("Failed to create circle");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({
          name: "Family Circle",
          category: "family",
          capacity: 10,
          contributionAmount: 50000, // in kobo
          cadence: "monthly",
          totalCycles: 10,
        });
      }}
    >
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Circle"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
```

### Make a Contribution

```tsx
import { useContributeMutation } from "@/hooks";

export function ContributeButton({ circleId }: { circleId: string }) {
  const { mutate: contribute, isLoading, error } = useContributeMutation();

  const handleContribute = async () => {
    try {
      const transaction = await contribute({
        circleId,
        amount: 50000, // in kobo
      });
      console.log("Contribution successful:", transaction);
    } catch (err) {
      console.error("Failed to contribute");
    }
  };

  return (
    <>
      <button onClick={handleContribute} disabled={isLoading}>
        {isLoading ? "Processing..." : "Contribute"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
```

## 💰 Wallet

### Get Wallet Summary

```tsx
import { useWalletSummary } from "@/hooks";
import { formatCurrency } from "@/utils/transform";

export function WalletBalance() {
  const { summary, isLoading } = useWalletSummary();

  if (isLoading) return <p>Loading...</p>;
  if (!summary) return <p>No wallet data</p>;

  return (
    <div>
      <p>Balance: {formatCurrency(summary.availableBalance)}</p>
      <p>Contributed this month: {formatCurrency(summary.contributedThisMonth)}</p>
      <p>Received this month: {formatCurrency(summary.payoutReceivedThisMonth)}</p>
    </div>
  );
}
```

### Get Transactions

```tsx
import { useWalletTransactions } from "@/hooks";
import { formatCurrency, formatDate } from "@/utils/transform";

export function TransactionsList() {
  const { transactions, isLoading, error, refresh } = useWalletTransactions({
    page: 1,
    perPage: 10,
  });

  if (isLoading) return <p>Loading transactions...</p>;

  return (
    <div>
      <button onClick={refresh}>Refresh</button>
      <table>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.title}</td>
              <td>{tx.type}</td>
              <td>{formatCurrency(tx.amount)}</td>
              <td>{formatDate(tx.date)}</td>
              <td>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Fund Wallet with Paystack

```tsx
import { useFundWalletMutation } from "@/hooks";

export function FundWalletForm() {
  const [amount, setAmount] = useState("");
  const { mutate: fundWallet, isLoading, error } = useFundWalletMutation();

  const handleFundWallet = async () => {
    try {
      const result = await fundWallet({
        amount: parseInt(amount) * 100, // Convert to kobo
        paymentMethodId: "paystack",
      });

      if (result.checkoutUrl) {
        // Redirect to Paystack checkout
        window.location.href = result.checkoutUrl;
      }
    } catch (err) {
      console.error("Failed to fund wallet");
    }
  };

  return (
    <>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in Naira"
      />
      <button onClick={handleFundWallet} disabled={isLoading}>
        {isLoading ? "Processing..." : "Fund Wallet"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
```

## 🔄 Direct Store Access

For advanced use cases, access stores directly:

```tsx
import { useAuthStore, useCirclesStore, useWalletStore } from "@/store";

export function AdvancedComponent() {
  // Auth store
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Circles store
  const circles = useCirclesStore((state) => state.myCircles.items);
  const selectedCircle = useCirclesStore((state) => state.selectedCircle);

  // Wallet store
  const summary = useWalletStore((state) => state.summary);
  const transactions = useWalletStore((state) => state.transactions.items);

  return <div>{/* Use the state */}</div>;
}
```

## 📊 Error Handling

All API calls throw `APIException`. Handle with:

```tsx
import { APIException, getErrorMessage, isAuthError, isRetriableError } from "@/utils/errors";

try {
  await someAPICall();
} catch (error) {
  // Get user-friendly message
  const message = getErrorMessage(error);

  // Check error type
  if (isAuthError(error)) {
    // Redirect to login
  } else if (isRetriableError(error)) {
    // Retry with backoff
  }

  console.error(message);
}
```

## 🔄 Data Transformations

Convert between kobo (backend) and Naira (UI):

```tsx
import {
  koboToNaira,
  nairaToKobo,
  formatCurrency,
  parseCurrency,
  formatDate,
  formatRelativeTime,
} from "@/utils/transform";

// Display: 500000 kobo → "₦5,000.00"
formatCurrency(500000);

// Input parsing: "5000" → 500000 kobo
nairaToKobo(5000);

// Date formatting
formatDate("2026-01-15"); // "15 Jan, 2026"
formatRelativeTime("2026-01-15T10:00:00"); // "2 days ago"
```

## 🔐 Secure Headers

All API requests automatically include:
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

Token is stored in localStorage and sent with every request.

## 🔄 Token Refresh

If a token expires (401 response):
1. Client automatically attempts refresh
2. If successful, retries the original request
3. If failed, clears auth and redirects to login

## 📝 Protected Routes

Create a wrapper component:

```tsx
"use client";

import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <p>Loading...</p>;

  return <>{children}</>;
}
```

Use in pages:

```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";
import HomeScreen from "@/screens/HomeScreen";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HomeScreen />
    </ProtectedRoute>
  );
}
```

## 🚀 Migration Strategy

To migrate a screen from mock data to real API:

1. **Remove mock data** (e.g., `defaultMyCircles`)
2. **Add hook** (e.g., `useMyCircles()`)
3. **Add loading state** in JSX
4. **Add error state** in JSX
5. **Replace prop data** with hook data
6. **Test API calls**

See `SCREEN_MIGRATION_EXAMPLE.md` for detailed example.

## 📚 Type Safety

Everything is fully typed:

```tsx
// API calls are type-safe
const response = await authAPI.login(credentials);
// response is typed as AuthResponse

// Store state is type-safe
const user = useAuthStore((state) => state.user);
// user is typed as User | null

// Hooks are type-safe
const { circles } = useMyCircles();
// circles is typed as Circle[]
```

## 🐛 Debugging

Enable Zustand DevTools (in development):

```tsx
// stores automatically use devtools middleware
// Open Redux DevTools extension to inspect store changes
```

## 📋 Checklist

Before shipping:

- [ ] Environment variables set
- [ ] Dependencies installed (`npm install zustand`)
- [ ] All screens migrated to use hooks
- [ ] Error handling implemented
- [ ] Token refresh tested
- [ ] Protected routes implemented
- [ ] Paystack integration complete
- [ ] Loading states added to all screens
- [ ] Error states handled in UI

## 🆘 Troubleshooting

### "Token not sent with requests"
- Ensure `NEXT_PUBLIC_API_URL` is correct
- Check localStorage has token stored
- Verify API client is using `apiClient` not fetch directly

### "401 Unauthorized on all requests"
- Token may be expired or invalid
- Check backend is sending valid JWT
- Clear localStorage and re-login

### "State not persisting after refresh"
- Auth store persists to localStorage automatically
- Other stores don't persist by default (designed for this)
- To persist, add `persist` middleware to store

### "Hydration mismatch on first load"
- Expected for stores that read localStorage
- `Providers` component handles initial hydration
- Use `useAuth().isAuthenticated` for conditional rendering
