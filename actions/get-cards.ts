"use server";

import { getAuthHeaders } from "@/lib/headers";
import { Action } from "@/models/action";
import { Card } from "@/models/card";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

type SuccessfulResponse = Card[];

interface FailedResponse {
  message?: string;
}

type Response = Action<200, SuccessfulResponse> | Action<400, FailedResponse>;

export const getCards = async (): Promise<Response> => {
  try {
    const token = cookies().get("access_token");
    if (!token)
      return { status: 400, data: { message: "Необходимо авторизоваться" } };
    const headers = getAuthHeaders(token.value);
    const response = await fetch(`${API_URL}/rest/my/v2/card`, {
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
