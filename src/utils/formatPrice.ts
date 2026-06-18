export interface PriceRange {
  min: number;
  max: number;
  currency?: string;
  suffix?: string;
  openEnded?: boolean;
}

export function formatPriceRange(range: PriceRange): string {
  const fmt = (n: number) => n.toLocaleString("es-MX");
  const currency = range.currency ?? "MXN";
  const suffix = range.suffix ?? "";

  if (range.min === range.max) {
    return `$${fmt(range.min)} ${currency}${suffix}`;
  }

  const plus = range.openEnded ? "+" : "";
  return `$${fmt(range.min)}–$${fmt(range.max)}${plus} ${currency}${suffix}`;
}
