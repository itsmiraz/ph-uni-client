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

type TUSER = {
  userId: string;
  role: string;
};

export type UserInitState = {
  user: null | TUSER;
  token: null | string;
};

export type LoginFormFieldType = {
  id?: string;
  password?: string;
};
