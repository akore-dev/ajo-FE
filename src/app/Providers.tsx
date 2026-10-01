// src/app/Providers.tsx
// Root providers for Zustand stores and other global setup.

"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore } from "@/store/auth";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const restoreSession = useAuthStore((state) => state.restoreSession);

  // Restore session from localStorage on app load
  useEffect(() => {
    restoreSession().catch(() => {
      // Session restore failed, user is not authenticated
    });
  }, [restoreSession]);

  return <>{children}</>;
}
