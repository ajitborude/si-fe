import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createQuery(params: { [key: string]: string | number }) {
  const queryParams: string[] = [];
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value) {
      queryParams.push(`${key}=${value}`);
    }
  });
  return queryParams.join('&');
}
