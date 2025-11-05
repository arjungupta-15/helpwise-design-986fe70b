import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: { maxRetries?: number; initialDelayMs?: number } = {}
): Promise<T> {
  const max = options.maxRetries ?? 3;
  let delayMs = options.initialDelayMs ?? 300;
  let lastError: any;
  for (let i = 0; i < max; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (i === max - 1) break;
      await new Promise((r) => setTimeout(r, delayMs));
      delayMs *= 2;
    }
  }
  throw lastError;
}
