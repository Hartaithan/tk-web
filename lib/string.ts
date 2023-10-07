export const pad = (num: number, places: number): string => {
  return String(num).padStart(places, "0");
};
