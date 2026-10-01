// src/utils/transform.ts
// API response transformation and data normalization.

// Convert kobo to naira (display format)
export const koboToNaira = (kobo: number): number => {
  return kobo / 100;
};

// Convert naira to kobo (for API)
export const nairaToKobo = (naira: number): number => {
  return Math.round(naira * 100);
};

// Format amount as currency string
export const formatCurrency = (kobo: number, currency: string = "₦"): string => {
  const naira = koboToNaira(kobo);
  return `${currency}${naira.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Parse currency string back to number
export const parseCurrency = (value: string): number => {
  // Remove currency symbol and commas, then convert to kobo
  const cleaned = value.replace(/[^\d.]/g, "");
  return nairaToKobo(parseFloat(cleaned) || 0);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format date and time
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format relative time (e.g., "2 days ago")
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(dateString);
};

// Calculate cycles remaining
export const cyclesRemaining = (currentCycle: number, totalCycles: number): number => {
  return Math.max(0, totalCycles - currentCycle);
};

// Calculate progress percentage
export const calculateProgress = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.min(100, Math.round((current / total) * 100));
};

// Sanitize user input
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Nigerian format)
export const isValidPhone = (phone: string): boolean => {
  // Accept +234, 0, or no prefix
  const phoneRegex = /^(\+234|0)?[789]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// Format phone number
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 10) return phone;

  const last10 = cleaned.slice(-10);
  return `+234${last10.slice(1)}`;
};
