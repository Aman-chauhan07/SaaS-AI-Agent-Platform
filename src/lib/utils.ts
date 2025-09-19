// Import clsx: helps conditionally join class names (e.g., "btn", isActive && "btn-active")
import { clsx, type ClassValue } from "clsx"

// Import twMerge: merges Tailwind classes and removes duplicates (e.g., "p-2 p-4" → "p-4")
import { twMerge } from "tailwind-merge"

// Utility function 'cn' → combines multiple class values into one clean Tailwind class string
export function cn(...inputs: ClassValue[]) {
  // clsx() → joins conditional classes
  // twMerge() → resolves Tailwind class conflicts
  return twMerge(clsx(inputs))
}
