# Quick Start Guide

## 📦 What Was Created

### New Directories & Files

```
src/
├── api/                          # API layer (NEW)
│   ├── client.ts                # HTTP client with interceptors
│   ├── auth.ts                  # Auth endpoints
│   ├── circles.ts               # Circles endpoints
│   ├── wallet.ts                # Wallet endpoints
│   └── index.ts                 # Exports
│
├── store/                        # State management (NEW)
│   ├── auth.ts                  # Auth store (Zustand)
│   ├── circles.ts               # Circles store (Zustand)
│   ├── wallet.ts                # Wallet store (Zustand)
│   └── index.ts                 # Exports
│
├── hooks/                        # Custom hooks (NEW)
│   ├── useAuth.ts               # Auth hooks
│   ├── useCircles.ts            # Circles hooks
│   ├── useWallet.ts             # Wallet hooks
│   └── index.ts                 # Exports
│
├── utils/
│   ├── errors.ts                # Error handling (UPDATED)
│   ├── transform.ts             # Data transformations (UPDATED)
│   └── format.ts                # (Existing)
│
├── types/
│   └── index.ts                 # (UPDATED - new types added)
│
└── app/
    ├── Providers.tsx            # Root providers (NEW)
    ├── layout.tsx               # (UPDATED)
    └── (other pages)

Documentation/
├── ARCHITECTURE.md              # High-level design
├── IMPLEMENTATION_GUIDE.md      # How to use
├── SCREEN_MIGRATION_EXAMPLE.md  # Migration walkthrough
└── QUICK_START.md              # This file
```

## 🚀 3-Minute Setup

### 1. Install Zustand
```bash
npm install zustand
```

### 2. Set Environment
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. You're Ready!
All the infrastructure is in place. Start using hooks in your screens.

## 📋 File-by-File Summary

| File | Purpose | Size | Status |
|------|---------|------|--------|
| `src/api/client.ts` | HTTP client with auth | ~300 lines | ✅ Production-ready |
| `src/api/auth.ts` | Auth endpoints | ~30 lines | ✅ Complete |
| `src/api/circles.ts` | Circles endpoints | ~60 lines | ✅ Complete |
| `src/api/wallet.ts` | Wallet endpoints | ~50 lines | ✅ Complete |
| `src/store/auth.ts` | Auth state | ~120 lines | ✅ Production-ready |
| `src/store/circles.ts` | Circles state | ~220 lines | ✅ Production-ready |
| `src/store/wallet.ts` | Wallet state | ~160 lines | ✅ Production-ready |
| `src/hooks/useAuth.ts` | Auth hooks | ~60 lines | ✅ Complete |
| `src/hooks/useCircles.ts` | Circles hooks | ~130 lines | ✅ Complete |
| `src/hooks/useWallet.ts` | Wallet hooks | ~120 lines | ✅ Complete |
| `src/utils/errors.ts` | Error handling | ~100 lines | ✅ Complete |
| `src/utils/transform.ts` | Data transforms | ~110 lines | ✅ Complete |
| `src/app/Providers.tsx` | Root setup | ~20 lines | ✅ Complete |

**Total:** ~1,500 lines of production-ready code

## 🎯 Common Use Cases

### Display a List (Circles)
```tsx
import { useMyCircles } from "@/hooks";

export function CirclesList() {
  const { circles, isLoading, error, refresh } = useMyCircles();
  
  if (isLoading) return <Loading />;
  if (error) return <Error onRetry={refresh} />;
  
  return circles.map(c => <Circle key={c.id} {...c} />);
}
```

### Form Submission (Login)
```tsx
import { useLoginMutation } from "@/hooks";

export function LoginForm() {
  const { mutate: login, isLoading, error } = useLoginMutation();
  
  const handleSubmit = async (email, password) => {
    await login({ email, password });
  };
  
  return (
    <form onSubmit={e => { e.preventDefault(); handleSubmit(...) }}>
      {/* form fields */}
    </form>
  );
}
```

### Display Summary (Wallet)
```tsx
import { useWalletSummary } from "@/hooks";
import { formatCurrency } from "@/utils/transform";

export function Balance() {
  const { summary, isLoading } = useWalletSummary();
  
  if (!summary) return null;
  return <p>{formatCurrency(summary.availableBalance)}</p>;
}
```

### Pagination (Transactions)
```tsx
import { useState } from "react";
import { useWalletTransactions } from "@/hooks";

export function Transactions() {
  const [page, setPage] = useState(1);
  const { transactions, hasMore } = useWalletTransactions({
    page,
    perPage: 10,
  });
  
  return (
    <>
      {transactions.map(tx => <Tx key={tx.id} {...tx} />)}
      {hasMore && <button onClick={() => setPage(p => p + 1)}>More</button>}
    </>
  );
}
```

## 🔄 Complete Example Flow

**User logs in → Circles load → User joins → Contributes → Wallet updates**

```tsx
// 1. Login
const { mutate: login } = useLoginMutation();
await login({ email, password });

// 2. User state automatically restored (via useAuth)
const { user } = useAuth();

// 3. Circles load automatically (via useMyCircles)
const { circles } = useMyCircles();

// 4. User joins circle
const { mutate: joinCircle } = useJoinCircleMutation();
await joinCircle({ circleId: "123" });

// 5. My circles automatically refreshed via store

// 6. User contributes
const { mutate: contribute } = useContributeMutation();
await contribute({ circleId: "123", amount: 50000 });

// 7. Wallet summary automatically refreshed
const { summary } = useWalletSummary();
// summary.availableBalance updated
```

All state updates happen **automatically** through the store!

## 🐛 Debugging

### Enable DevTools
Open Redux DevTools extension (if installed) to see:
- All store state
- All actions dispatched
- State changes over time
- Time-travel debugging

### Check Network Requests
Open DevTools Network tab:
1. Look for requests to `/api/*`
2. Check Authorization header is present
3. Verify response format matches types

### Common Issues

**Q: "Token not being sent"**
A: Ensure `NEXT_PUBLIC_API_URL` is correct, check localStorage has token

**Q: "401 Unauthorized"**
A: Token may be invalid, try logging in again

**Q: "State not updating"**
A: Make sure you're using hooks, not directly accessing store

**Q: "Infinite loading"**
A: Check if API endpoint exists and returns data in expected format

## 📖 Documentation Map

| You want to... | Read this |
|---|---|
| Understand the architecture | ARCHITECTURE.md |
| Learn how to use everything | IMPLEMENTATION_GUIDE.md |
| Migrate a screen | SCREEN_MIGRATION_EXAMPLE.md |
| Get started quickly | QUICK_START.md (this file) |

## ✅ Pre-Migration Checklist

Before migrating your first screen:

- [ ] `npm install zustand` (or manually)
- [ ] `.env.local` created with API URL
- [ ] Read IMPLEMENTATION_GUIDE.md
- [ ] Read SCREEN_MIGRATION_EXAMPLE.md
- [ ] Understand the hook pattern
- [ ] Understand error handling
- [ ] Understand data transformation

## 🎬 Getting Started

1. **Pick a simple screen** (e.g., ProfileScreen)
2. **Import the hook** (e.g., `useAuth`)
3. **Remove mock data** from component
4. **Add hook to component**
5. **Add loading state** to JSX
6. **Add error state** to JSX
7. **Test in browser** - check Network tab
8. **Move to next screen** and repeat

Each screen takes ~30 minutes to migrate.

## 🚀 You're Ready!

Everything is set up and ready to use. No additional configuration needed.

Start with the easiest screen and work your way up:
1. **Easiest:** ProfileScreen (just display)
2. **Medium:** WalletScreen (display + refetch)
3. **Hard:** CirclesScreen (multiple tabs + mutations)
4. **Hardest:** Circle flows (nested data + side effects)

### First Command
```tsx
import { useAuth } from "@/hooks";

// Add this to any component and it works!
const { user, isAuthenticated } = useAuth();
```

Happy coding! 🎉
