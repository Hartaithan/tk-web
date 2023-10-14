"use server";

import { baseHeaders } from "@/lib/headers";
import { Action } from "@/models/action";
import { LoginPayload } from "@/models/auth";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const TWO_WEEKS = 60 * 60 * 24 * 14;

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

export const generateForm = (object: Object): URLSearchParams => {
  const form = new URLSearchParams();
  const fields = Object.entries(object);
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    form.append(field[0], field[1]);
  }
  form.append("grant_type", "phone");
  form.append("resource", "TransportCard");
  form.append("scope", "openid profile roles offline_access");
  return form;
};

export const login = async (payload: LoginPayload): Promise<Response> => {
  try {
    const encoded = generateForm(payload);
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
    cookies().set("access_token", tokens.access_token, {
      maxAge: tokens.expires_in,
    });
    cookies().set("refresh_token", tokens.refresh_token, {
      maxAge: TWO_WEEKS,
    });
    return { status: 200, data: tokens };
  } catch (error) {
    return {
      status: 400,
      data: {
        error: "unknown",
        error_description: "Неизвестная ошибка",
        error_uri: "urn:unknown",
      },
    };
  }
};
