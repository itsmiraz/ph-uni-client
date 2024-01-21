import { ReactNode } from "react";

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[] | undefined;
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TItemsProps = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TItemsProps[];
};

export type UserInitState = {
  user: null | object;
  token: null | string;
};
