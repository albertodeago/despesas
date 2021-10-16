import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CategoriesContext, GroupsContext } from "../contexts";
import { ExpenseGroup, ExpenseApi, Expense } from "../api";

interface ExpenseListProps {
  selectedGroup: ExpenseGroup;
}
export function ExpenseList(props: ExpenseListProps) {
  const groups = useContext(GroupsContext);
  const categories = useContext(CategoriesContext);

  const [loading, setLoading] = useState(false);
  const [expenseList, setExpenseList] = useState<Array<Expense>>([]);

  useEffect(() => {
    console.log("ExpenseList::useEffect - loading expense list");
    const getExpenseList = async () => {
      try {
        setLoading(true);
        const isAllGroups = props.selectedGroup.id === "all-group-item";
        const result = await (isAllGroups
          ? ExpenseApi.fetchExpensesFromAllGroups(groups)
          : ExpenseApi.fetchFromGroup(props.selectedGroup));

        setExpenseList(result);
      } catch (error: any) {
        alert("Something went wrong fetching the expense list" + error.message);
      } finally {
        setLoading(false);
      }
    };
    getExpenseList();
  }, [groups, props.selectedGroup]);

  const emptyExpenseListEl = () => <li>No expenses yet</li>;
  const expenseListEl = () =>
    expenseList.map((exp: Expense) => {
      const category = categories.find((c) => c.id === exp.category_id);
      return (
        <li key={exp.id}>
          {exp.name} - {exp.amount} ({category?.name})
        </li>
      );
    });

  return (
    <div>
      <h4>Expense list</h4>
      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : expenseList.length === 0 ? (
          emptyExpenseListEl()
        ) : (
          expenseListEl()
        )}
        <li>
          <Link to="/create-expense">Add expense</Link>
        </li>
      </ul>
    </div>
  );
}
