export const formatDate = (value: string, separator: string = "/"): string => {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}${separator}${month}${separator}${year}`;
};
