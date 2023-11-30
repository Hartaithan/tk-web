"use server";

import { getRefreshedParsedCookies } from "@/lib/cookies";
import { getAuthHeaders } from "@/lib/headers";
import { Action } from "@/models/action";
import { AddCardPayload } from "@/models/card";
import { FieldError } from "@/models/error";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface SuccessfulResponse {
  id: number;
  success: boolean;
}

interface FailedResponse {
  message?: string;
  modelState?: Record<keyof AddCardPayload, FieldError>;
}

type Response = Action<200, SuccessfulResponse> | Action<400, FailedResponse>;

export const addCard = async (payload: AddCardPayload): Promise<Response> => {
  try {
    const refreshed = getRefreshedParsedCookies();
    const token = refreshed["access_token"];
    if (!token)
      return { status: 400, data: { message: "Необходимо авторизоваться" } };
    const headers = getAuthHeaders(token);
    const response = await fetch(`${API_URL}/rest/my/v2/card`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
      cache: "no-cache",
    });
    const data = await response.json();
    if (!response.ok) return { status: 400, data };
    return { status: 200, data };
  } catch (error) {
    return {
      status: 400,
      data: {
        message: "Неизвестная ошибка",
      },
    };
  }
};
