import { FC } from "react";

export interface PageProps<P = Object, SP = Object> {
  params: P;
  searchParams: SP;
}

export type Page<P = Object, SP = Object> = FC<PageProps<P, SP>>;
