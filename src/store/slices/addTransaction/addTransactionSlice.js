import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";

// Transactions state and reducers
const initialState = {
  items: [
    {
      id: "t6",
      type: "Expense",
      amount: 1200,
      category: "Rent",
      description: "Monthly Rent",
      date: "2025-01-01",
    },
    {
      id: "t2",
      type: "Expense",
      amount: 250,
      category: "Groceries",
      description: "Weekly Groceries",
      date: "2025-01-10",
    },
    {
      id: "t3",
      type: "Expense",
      amount: 80,
      category: "Transport",
      description: "Gas and Metro",
      date: "2025-01-12",
    },
    {
      id: "t1",
      type: "Income",
      amount: 3500,
      category: "Salary",
      description: "Monthly Salary",
      date: "2025-01-15",
    },
    {
      id: "t4",
      type: "Expense",
      amount: 150,
      category: "Entertainment",
      description: "Movies & Dining",
      date: "2025-01-18",
    },
    {
      id: "t5",
      type: "Income",
      amount: 500,
      category: "Freelance",
      description: "Freelance Project",
      date: "2025-01-20",
    },
  ],
};

const addTransactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ type, amount, category, description, date }) {
        const id = nanoid();
        return {
          payload: {
            id,
            type,
            amount: Number(amount),
            category,
            description,
            date: dayjs(date).format("YYYY-MM-DD"),
          },
        };
      },
    },
    removeTransaction(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTransaction, removeTransaction } = addTransactionSlice.actions;

// Selectors
const selectTransactionsState = (state) => state.transactions;

export const selectTransactions = createSelector(
  [selectTransactionsState],
  (transactionsState) =>
    [...transactionsState.items].sort(
      (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
    )
);

export const selectIncomeTotal = createSelector([selectTransactions], (items) =>
  items.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0)
);

export const selectExpensesTotal = createSelector([selectTransactions], (items) =>
  items.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0)
);

export const selectBalanceTotal = createSelector(
  [selectIncomeTotal, selectExpensesTotal],
  (income, expenses) => income - expenses
);

export const selectTransactionsCount = createSelector(
  [selectTransactions],
  (items) => items.length
);

export const selectExpenseByCategory = createSelector(
  [selectTransactions],
  (items) => {
    const totals = items
      .filter((t) => t.type === "Expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }
);

export const buildIncomeVsExpensesSeries = createSelector(
  [selectTransactions],
  (items) => {
    const today = dayjs("2025-01-20"); // keep consistent with demo data timeframe
    const start = today.subtract(15, "day");

    const days = [];
    for (let d = 0; d <= 15; d += 1) {
      const theDay = start.add(d, "day");
      days.push(theDay);
    }

    const byDay = days.map((d) => ({
      name: d.format("MMM D"),
      income: 0,
      expenses: 0,
      key: d.format("YYYY-MM-DD"),
    }));

    const indexByKey = Object.fromEntries(byDay.map((e, i) => [e.key, i]));

    items.forEach((t) => {
      const key = dayjs(t.date).format("YYYY-MM-DD");
      if (!(key in indexByKey)) return;
      const idx = indexByKey[key];
      if (t.type === "Income") byDay[idx].income += t.amount;
      else byDay[idx].expenses += t.amount;
    });

    return byDay;
  }
);

export default addTransactionSlice.reducer;