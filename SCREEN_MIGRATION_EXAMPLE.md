# Screen Migration Example: CirclesScreen

This document shows exactly how to migrate a screen from mock data to real API calls.

## ❌ BEFORE: Using Mock Data

**Current `src/screens/CirclesScreen.tsx`:**

```tsx
"use client";

import { useState } from "react";
import { Plus, ChevronRight, Trophy } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import type { Circle, NavRoute } from "../types";

// ❌ Mock data hardcoded
const defaultMyCircles: Circle[] = [
  {
    id: "family",
    name: "Family Circle",
    category: "family",
    status: "active",
    memberCount: 10,
    capacity: 10,
    contributionAmount: 50000,
    currency: "₦",
    cadence: "monthly",
    currentCycle: 4,
    totalCycles: 10,
    membersPaidThisCycle: 4,
    poolTotal: 400000,
    poolTarget: 500000,
    nextPayoutMemberName: "You",
    nextPayoutAmount: 485000,
    cyclesUntilYourTurn: 0,
    yourPosition: 7,
    members: [],
  },
  // ... more mock circles
];

interface CirclesScreenProps {
  myCircles?: Circle[];
  availableCircles?: Circle[];
  onCreateCircle?: () => void;
  onOpenCircle?: (circleId: string) => void;
  onNavigate?: (route: NavRoute) => void;
}

export default function CirclesScreen({
  myCircles = defaultMyCircles,  // ❌ Default prop data
  availableCircles = [],
  onCreateCircle,
  onOpenCircle,
  onNavigate,
}: CirclesScreenProps) {
  const [tab, setTab] = useState<CirclesTab>("mine");
  const circles = tab === "mine" ? myCircles : availableCircles;

  return (
    <Shell>
      {/* ... render circles ... */}
    </Shell>
  );
}
```

**Issues:**
- ❌ No real data fetching
- ❌ No loading state
- ❌ No error handling
- ❌ No API integration
- ❌ Data never updates

---

## ✅ AFTER: Using Real API

**Updated `src/screens/CirclesScreen.tsx`:**

```tsx
"use client";

import { useState } from "react";
import { Plus, ChevronRight, Trophy } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import { useMyCircles, useCreateCircleMutation } from "@/hooks";  // ✅ Use hooks
import { formatNaira } from "@/utils/format";
import { getErrorMessage } from "@/utils/errors";
import type { NavRoute } from "@/types";

type CirclesTab = "mine" | "available";

interface CirclesScreenProps {
  onNavigate?: (route: NavRoute) => void;
}

export default function CirclesScreen({ onNavigate }: CirclesScreenProps) {
  const [tab, setTab] = useState<CirclesTab>("mine");
  
  // ✅ Fetch real data from API
  const {
    circles,
    isLoading,
    error,
    refresh,
  } = useMyCircles();

  // ✅ Handle tab switching (available circles loaded separately if needed)
  if (tab === "available") {
    return <AvailableCirclesTab onNavigate={onNavigate} />;
  }

  return (
    <Shell>
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-[24px] font-semibold text-ajo-text">
            Circles
          </h1>
          <button
            type="button"
            aria-label="Create a circle"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ajo-orange text-white"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="mt-5">
          <Tabs
            tabs={[
              { value: "mine", label: "My Circles" },
              { value: "available", label: "Available" },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        {/* ✅ Loading state */}
        {isLoading && (
          <div className="mt-5 text-center text-ajo-text-muted">
            Loading circles...
          </div>
        )}

        {/* ✅ Error state */}
        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-4 text-red-700">
            <p className="font-medium">{getErrorMessage(error)}</p>
            <button
              onClick={refresh}
              className="mt-2 text-sm text-red-600 hover:text-red-700"
            >
              Try again
            </button>
          </div>
        )}

        {/* ✅ Render real data */}
        <div className="mt-5 flex flex-col gap-3">
          {circles.map((circle) => {
            const isRecruiting = circle.status === "recruiting";
            return (
              <button
                key={circle.id}
                type="button"
                className="text-left"
              >
                <Card className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <Avatar name={circle.name} size={44} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-semibold text-ajo-text">
                          {circle.name}
                        </h3>
                        <Badge status={circle.status} />
                      </div>
                      <p className="mt-0.5 text-[12px] text-ajo-text-muted">
                        {circle.capacity} members · {circle.cadence === "monthly" ? "Monthly" : "Weekly"}
                      </p>
                    </div>
                  </div>

                  {isRecruiting ? (
                    <div className="flex items-center justify-between pl-[52px] text-[13px]">
                      <span className="text-ajo-text-muted">
                        {circle.memberCount} / {circle.capacity} joined
                      </span>
                      <span className="font-semibold text-ajo-text">
                        {formatNaira(circle.contributionAmount)} / month
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between pl-[52px]">
                        <span className="text-[13px] text-ajo-text-muted">
                          Cycle {String(circle.currentCycle).padStart(2, "0")} / {circle.totalCycles}
                        </span>
                        <ChevronRight size={16} className="text-ajo-text-faint" />
                      </div>
                      <div className="flex items-center justify-between pl-[52px]">
                        <CycleDots total={circle.totalCycles} completed={circle.membersPaidThisCycle} />
                        <span className="text-[12px] text-ajo-text-faint">
                          {circle.membersPaidThisCycle}/{circle.capacity} paid
                        </span>
                      </div>
                      <div className="ml-[52px] flex items-center gap-1.5 text-[13px] font-medium text-ajo-text">
                        <Trophy size={14} className="text-ajo-text-muted" />
                        <span>
                          {circle.cyclesUntilYourTurn === 0 ? "Your turn" : `Next turn - ${circle.nextPayoutMemberName}`} ·{" "}
                          <span className="font-semibold text-ajo-orange">
                            {formatNaira(circle.nextPayoutAmount)}
                          </span>
                        </span>
                      </div>
                    </>
                  )}
                </Card>
              </button>
            );
          })}

          {/* ✅ Empty state */}
          {!isLoading && circles.length === 0 && (
            <EmptyState
              title="No circles yet"
              description="Create or join a circle to get started"
              icon={<PlusIcon />}
            />
          )}
        </div>
      </div>

      <BottomNav active="circles" onNavigate={onNavigate} />
    </Shell>
  );
}

// ✅ Separate component for available circles
function AvailableCirclesTab({ onNavigate }: { onNavigate?: (route: NavRoute) => void }) {
  const [params, setParams] = useState({ page: 1, perPage: 10 });
  
  // In future: implement useAvailableCircles hook
  // For now, return placeholder or use same hook with different params
  
  return <div>Coming soon: Available circles</div>;
}
```

---

## 🔄 Step-by-Step Migration Process

### Step 1: Add the Hook Import
```tsx
// Add at the top of your screen component
import { useMyCircles, useCreateCircleMutation } from "@/hooks";
```

### Step 2: Remove Mock Data and Props
```tsx
// ❌ DELETE: Mock data constant
// const defaultMyCircles: Circle[] = [...]

// ❌ DELETE: Props for mock data
// interface CirclesScreenProps {
//   myCircles?: Circle[];
//   ...
// }

// ✅ KEEP: Only navigation-related props
interface CirclesScreenProps {
  onNavigate?: (route: NavRoute) => void;
}
```

### Step 3: Call the Hook
```tsx
export default function CirclesScreen({ onNavigate }: CirclesScreenProps) {
  const [tab, setTab] = useState<CirclesTab>("mine");
  
  // ✅ Add this
  const { circles, isLoading, error, refresh } = useMyCircles();
  
  // Use circles instead of myCircles prop
}
```

### Step 4: Add Loading State
```tsx
{/* ✅ Show loading state */}
{isLoading && (
  <div className="mt-5 text-center text-ajo-text-muted">
    Loading circles...
  </div>
)}
```

### Step 5: Add Error State
```tsx
{/* ✅ Show error state with retry */}
{error && (
  <div className="mt-5 rounded-lg bg-red-50 p-4 text-red-700">
    <p className="font-medium">{getErrorMessage(error)}</p>
    <button onClick={refresh} className="mt-2 text-sm">
      Try again
    </button>
  </div>
)}
```

### Step 6: Replace Data Source
```tsx
// ❌ Before
const circles = tab === "mine" ? myCircles : availableCircles;

// ✅ After
const circles = ...circles;  // From the hook
```

### Step 7: Add Empty State
```tsx
{!isLoading && circles.length === 0 && (
  <EmptyState
    title="No circles yet"
    description="Create or join a circle"
  />
)}
```

---

## 📊 Before vs After Comparison

| Aspect | Before | After |
|--------|--------|-------|
| **Data source** | Hardcoded in component | API via hook |
| **Loading state** | None | ✅ Implemented |
| **Error handling** | None | ✅ Implemented |
| **Data freshness** | Stale | ✅ Real-time |
| **Lines of code** | 150+ | 120 |
| **Reusability** | Low (data in component) | ✅ High (data in store) |
| **Testing** | Hard (prop-dependent) | ✅ Easy (hook-based) |
| **Performance** | Low (no caching) | ✅ Good (store caching) |

---

## 🎯 Migration Checklist

For each screen:

- [ ] Remove mock data constant
- [ ] Remove mock data props
- [ ] Import hook (`useMyCircles`, `useWallet`, etc.)
- [ ] Call hook in component
- [ ] Replace prop with hook data
- [ ] Add loading state JSX
- [ ] Add error state JSX
- [ ] Add empty state JSX
- [ ] Add refresh button functionality
- [ ] Test in browser
- [ ] Verify API calls in Network tab
- [ ] Check error handling works

---

## 🧪 Testing the Migration

### 1. Test Happy Path
```
1. Open browser DevTools (Network tab)
2. Navigate to Circles screen
3. Should see API call to GET /api/circles/my-circles
4. Wait for response
5. Verify circles display correctly
```

### 2. Test Loading State
```
1. Slow down network to "Slow 3G" in DevTools
2. Navigate to screen
3. Should see "Loading circles..." for ~2 seconds
4. Then circles appear
```

### 3. Test Error State
```
1. Turn off network in DevTools
2. Refresh page
3. Should show error message
4. Click "Try again" button
5. Should show error again (or retry successfully if network back)
```

### 4. Test Refresh
```
1. Click refresh button (if added)
2. Should see loading state briefly
3. Data should refresh from API
4. Watch Network tab to confirm new API call
```

---

## 📝 Common Patterns

### Pattern 1: Fetch and Display
```tsx
const { data, isLoading, error } = useSomeData();

if (isLoading) return <Loading />;
if (error) return <Error onRetry={refresh} />;

return <List data={data} />;
```

### Pattern 2: Mutation with Feedback
```tsx
const { mutate, isLoading, error } = useSomeMutation();

const handleSubmit = async (data) => {
  try {
    const result = await mutate(data);
    showSuccess(`Success: ${result.message}`);
    refresh(); // Refetch list if needed
  } catch (err) {
    showError(getErrorMessage(err));
  }
};
```

### Pattern 3: Pagination
```tsx
const [page, setPage] = useState(1);
const { data, hasMore } = useSomeData({ page, perPage: 10 });

return (
  <>
    {data.map(item => <Item key={item.id} {...item} />)}
    {hasMore && (
      <button onClick={() => setPage(p => p + 1)}>
        Load more
      </button>
    )}
  </>
);
```

---

## 🚀 Ready to Migrate?

Start with one simple screen like:
1. **ProfileScreen** (just display user data)
2. **WalletScreen** (display transactions)
3. **HomeScreen** (combines multiple data sources)

Then progress to more complex ones like:
4. **CirclesScreen** (this example)
5. **CircleDetailScreen** (nested data)

Each migration gets faster! 🎯
