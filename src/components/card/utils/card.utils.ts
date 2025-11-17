export const buildClassName = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

export const normalizePadding = (padding?: number | string) => {
  if (padding === undefined) return "1.5rem";
  if (typeof padding === "number") return `${padding}px`;
  return padding;
};
