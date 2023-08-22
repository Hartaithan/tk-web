const HOST = process.env.NEXT_PUBLIC_HOST as string;

export const baseHeaders = new Headers({
  "Content-Type": "application/json; charset=UTF-8",
  Host: HOST,
  "Accept-Encoding": "gzip",
  "User-Agent": "okhttp/4.9.3",
});

export const getAuthHeaders = (token: string | undefined): Headers => {
  const headers = baseHeaders;
  if (token) {
    headers.set("Authorization", "Bearer " + token);
  }
  return headers;
};
