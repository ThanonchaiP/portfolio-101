export function formatNumberWithCommas(
  num: number,
  options: Intl.NumberFormatOptions = {},
): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat("en-US", {
    ...defaultOptions,
    ...options,
  }).format(num);
}
