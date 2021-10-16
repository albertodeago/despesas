import React, { useState, useContext } from "react";
import { ExpenseCategory, ExpenseGroup, ExpenseApi } from "../api";
import {
  SessionContext,
  GroupsContext,
  CategoriesContext,
  UserId,
} from "../contexts";

export function CreateExpense() {
  const session = useContext(SessionContext);
  const groups = useContext(GroupsContext);
  const categories = useContext(CategoriesContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [selectedGroup, setSelectedGroup] = useState<ExpenseGroup>(groups[1]);
  const [availableCategories, setAvailableCategories] = useState<
    ExpenseCategory[]
  >(() => categories.filter((c) => c.group_id === selectedGroup.id));
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>(
    availableCategories[0]
  );

  // const [payers, setPayers] = useState<Object>({})
  const owner = session.user!.id;

  const createExpense = async function (params: {
    name: string;
    amount: number;
    group: ExpenseGroup;
    category: ExpenseCategory;
    owner: UserId;
  }) {
    setLoading(true);

    const { name, amount, group, category } = params;

    ExpenseApi.create({
      name,
      amount,
      payers: {},
      owner,
      group_id: group.id,
      category_id: category.id,
    });

    setLoading(false);
  };

  const onGroupChange = function (evt: React.ChangeEvent<HTMLSelectElement>) {
    const group = JSON.parse(evt.target.value) as ExpenseGroup;
    setAvailableCategories(categories.filter((c) => c.group_id === group.id));
    setSelectedGroup(group);
  };
  const onCategoryChange = function (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) {
    const cat = JSON.parse(evt.target.value) as ExpenseCategory;
    setSelectedCategory(cat);
  };

  return (
    <div>
      <h3>Create Expense</h3>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="groups">For which group</label>
        <select
          name="groups"
          id="groups"
          value={JSON.stringify(selectedGroup)}
          onChange={(evt) => onGroupChange(evt)}
        >
          {groups.map((g: ExpenseGroup) => (
            <option key={g.id} value={JSON.stringify(g)}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="categories">Category</label>
        <select
          name="categories"
          id="categories"
          value={JSON.stringify(selectedCategory)}
          onChange={(evt) => onCategoryChange(evt)}
        >
          {availableCategories.map((c) => (
            <option key={c.id} value={JSON.stringify(c)}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          className="button block primary"
          onClick={() =>
            createExpense({
              name,
              amount,
              group: selectedGroup,
              category: selectedCategory,
              owner,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Create"}
        </button>
      </div>
    </div>
  );
}
