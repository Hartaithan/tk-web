"use server";

import { baseHeaders } from "@/lib/headers";
import { Action } from "@/models/action";
import { RegisterPayload } from "@/models/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface SuccessfulResponse {
  length: number;
  success: true;
}

interface FailedResponse {
  message: string;
}

type Response = Action<200, SuccessfulResponse> | Action<400, FailedResponse>;

export const register = async (payload: RegisterPayload): Promise<Response> => {
  try {
    const response = await fetch(`${API_URL}/auth/Account/register-phone`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: baseHeaders,
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
