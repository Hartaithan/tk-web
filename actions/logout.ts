"use server";

import { Action } from "@/models/action";
import { cookies } from "next/headers";

interface SuccessfulResponse {
  message: string;
}

interface FailedResponse {
  message: string;
}

type Response = Action<200, SuccessfulResponse> | Action<400, FailedResponse>;

export const logout = async (): Promise<Response> => {
  try {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
    return { status: 200, data: { message: "Вы успешно вышли из системы." } };
  } catch (error) {
    return {
      status: 400,
      data: {
        message: "Не удалось выйти из системы. Попробуйте позже.",
      },
    };
  }
};
