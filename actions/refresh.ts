"use server";

import { baseHeaders } from "@/lib/headers";
import { Action } from "@/models/action";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface SuccessfulResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  id_token: string;
}

interface FailedResponse {
  error: string;
  error_description: string;
}

type Response = Action<200, SuccessfulResponse> | Action<400, FailedResponse>;

export type NullableRefreshResponse = Response | null;

export const generateForm = (token: string): URLSearchParams => {
  const form = new URLSearchParams();
  form.append("grant_type", "refresh_token");
  form.append("resource", "TransportCard");
  form.append("scope", "openid profile roles offline_access");
  form.append("refresh_token", token);
  return form;
};

export const refresh = async (token: string): Promise<Response> => {
  try {
    const encoded = generateForm(token);
    const response = await fetch(`${API_URL}/auth/Account/login`, {
      method: "POST",
      body: encoded,
      headers: {
        ...baseHeaders,
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      cache: "no-cache",
    });
    const data = await response.json();
    if (!response.ok) return { status: 400, data };
    const tokens: SuccessfulResponse = data;
    return { status: 200, data: tokens };
  } catch (error) {
    return {
      status: 400,
      data: {
        error: "unknown",
        error_description: "Неизвестная ошибка",
      },
    };
  }
};
