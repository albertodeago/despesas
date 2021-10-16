import { ExpenseCategoryId, ExpenseGroup, ExpenseGroupId } from ".";
import { UserId } from "../contexts";
import { supabase } from "../supabaseClient";

export type ExpenseId = string;

export interface Expense {
  id: ExpenseId;
  created_at: number;
  updated_at: number;
  name: string;
  amount: number;
  payers: Object; // TODO: type this shit
  owner: UserId;
  group_id: ExpenseGroupId;
  category_id: ExpenseCategoryId;
}

export interface ExpenseCreationData {
  name: string;
  amount: number;
  payers: Object;
  owner: UserId;
  group_id: ExpenseGroupId;
  category_id: ExpenseCategoryId;
}

export const ExpenseApi = {
  fetchExpensesFromAllGroups: async function (
    groups: Array<ExpenseGroup>
  ): Promise<Array<Expense>> {
    const result = await supabase
      .from("expenses")
      .select("*")
      .in(
        "group_id",
        groups.map((g) => g.id)
      );

    let { data, error, status } = result;

    if (error && status !== 406) {
      throw error;
    }

    return data as Array<Expense>;
  },

  fetchFromGroup: async function (
    group: ExpenseGroup
  ): Promise<Array<Expense>> {
    const result = await supabase
      .from("expenses")
      .select("*")
      .eq("group_id", group.id);

    let { data, error, status } = result;

    if (error && status !== 406) {
      throw error;
    }

    return data as Array<Expense>;
  },

  async create(params: ExpenseCreationData): Promise<Expense> {
    const result = await supabase.from("expenses").insert([
      Object.assign({}, params, {
        created_at: new Date(),
        updated_at: new Date(),
      }),
    ]);

    const { data, error, status } = result;

    if (error && status !== 406) {
      throw Error;
    }

    return data![0] as Expense;
  },

  // async update() {

  // },

  // async delete() {

  // }
};
