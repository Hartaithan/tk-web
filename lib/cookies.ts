import { cookies, headers } from "next/headers";

export const getRefreshedCookies = (): string => {
  let refreshed: string = cookies().toString() ?? "";
  if (refreshed.includes("access_token")) {
    return refreshed;
  }
  const responseCookies = headers().get("set-cookie");
  if (responseCookies !== undefined) {
    refreshed = `${refreshed}; ${responseCookies}`;
  }
  return refreshed;
};

export const parseCookies = (
  value: string,
): Record<string, string | undefined> => {
  const cookies = value.split("; ");
  let result: Record<string, string | undefined> = {};
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    result[name] = value;
  }
  return result;
};

export const getRefreshedParsedCookies = (): Record<
  string,
  string | undefined
> => {
  const cookies = getRefreshedCookies();
  const parsed = parseCookies(cookies);
  return parsed;
};
