export const formatDate = (value: string, separator: string = "/"): string => {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}${separator}${month}${separator}${year}`;
};

export const formatFullDate = (
  value: string,
  separator: string = "/",
): string => {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day}${separator}${month}${separator}${year} ${hours}:${minutes}`;
};
