import { supabase } from "../supabaseClient";
import type { UserId } from "../contexts";

export type ExpenseGroupId = string;

export interface ExpenseGroup {
  id: ExpenseGroupId;
  created_at: number;
  updated_at: number;
  name: string;
  image_url: string | null;
  owner: UserId;
  partecipants: Array<UserId>;
}

export const ExpenseGroupsApi = {
  fetch: async function (userId: UserId): Promise<Array<ExpenseGroup>> {
    let { data, error, status } = await supabase
      .from("expense_groups")
      .select("*")
      .eq("owner", userId);

    if (error && status !== 406) {
      throw error;
    }

    return data as Array<ExpenseGroup>;
  },

  create: async function (params: {
    name: string;
    partecipants: Array<UserId>;
    owner: UserId;
  }) {
    let { data, error, status } = await supabase.from("expense_groups").insert([
      {
        created_at: new Date(),
        updated_at: new Date(),
        name: params.name,
        image_url: null,
        owner: params.owner,
        partecipants: params.partecipants,
      },
    ]);

    if (error && status !== 406) {
      throw error;
    }

    return data![0] as ExpenseGroup;
  },

  update: async function () {
    // TODO: implement
  },

  delete: async function () {
    // TODO: implement
  },
};
