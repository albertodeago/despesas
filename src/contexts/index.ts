import React from "react";
import { ExpenseCategory, ExpenseGroup } from "../api";

export type UserId = string;

export interface User {
  app_metadata: { provider: string };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_change_confirm_status: number;
  email_confirmed_at: string;
  id: UserId;
  last_sign_in_at: string;
  phone: "";
  recovery_sent_at: string;
  role: string;
  updated_at: string;
  user_metadata: Object;
}

export interface Session {
  user?: User;
}

const SessionContext = React.createContext<Session>({});

const GroupsContext = React.createContext<ExpenseGroup[]>([]);

const CategoriesContext = React.createContext<ExpenseCategory[]>([]);

export { SessionContext, GroupsContext, CategoriesContext };
