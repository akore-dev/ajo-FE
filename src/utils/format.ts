// src/utils/format.ts

export function formatNaira(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  const formatted = Math.abs(amount).toLocaleString("en-NG");
  return `${sign}₦${formatted}`;
}

export function formatSignedNaira(amount: number): string {
  const sign = amount >= 0 ? "+" : "-";
  return `${sign}₦${Math.abs(amount).toLocaleString("en-NG")}`;
}
