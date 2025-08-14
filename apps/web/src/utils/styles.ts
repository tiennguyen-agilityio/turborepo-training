import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Efficiently merge Tailwind css classes in JS without style conflicts
 * @param classes string
 * @returns string
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
