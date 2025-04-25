import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (number = 0, decimalPlaces = 0, forceDecimals = false): string => {
  let formattedNumber = number.toLocaleString("en-US", {
    minimumFractionDigits: forceDecimals ? decimalPlaces : 0,
    maximumFractionDigits: decimalPlaces,
  });

  // Remove trailing zeros only when forceDecimals is false
  if (!forceDecimals) {
    formattedNumber = formattedNumber.replace(/(\.\d*[1-9])0+|\.0*$/, "$1");
  }

  return formattedNumber;
};
