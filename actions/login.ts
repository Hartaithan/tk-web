import { baseHeaders } from "@/lib/headers";
import { Action } from "@/models/action";
import { LoginPayload } from "@/models/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface SuccessfulResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
}

interface FailedResponse {
  error: string;
  error_description: string;
  error_uri: string;
}

type Response = Action<200, SuccessfulResponse> | Action<400, FailedResponse>;

export const register = async (payload: LoginPayload): Promise<Response> => {
  const response = await fetch(API_URL + "/auth/Account/login", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: baseHeaders,
    cache: "no-cache",
  });
  const data = await response.json();
  if (!response.ok) return { status: 400, data };
  return { status: 200, data };
};
