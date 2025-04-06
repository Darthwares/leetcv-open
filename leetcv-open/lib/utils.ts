import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

export function getInitials(name: string): string {
  if (!name) return "";
  
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}