import { createSlice, nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";

// Transaction model:
// { id, type: 'Income' | 'Expense', amount, category, description, dateISO }

const initialTransactions = [
  {
    id: nanoid(),
    type: "Income",
    amount: 3500,
    category: "Salary",
    description: "Monthly Salary",
    dateISO: dayjs("2025-01-15").toISOString(),
  },
  {
    id: nanoid(),
    type: "Income",
    amount: 500,
    category: "Freelance",
    description: "Freelance Project",
    dateISO: dayjs("2025-01-20").toISOString(),
  },
  {
    id: nanoid(),
    type: "Expense",
    amount: 1200,
    category: "Rent",
    description: "Monthly apartment rent",
    dateISO: dayjs("2025-01-01").toISOString(),
  },
  {
    id: nanoid(),
    type: "Expense",
    amount: 250,
    category: "Groceries",
    description: "Weekly Groceries",
    dateISO: dayjs("2025-01-10").toISOString(),
  },
  {
    id: nanoid(),
    type: "Expense",
    amount: 80,
    category: "Transport",
    description: "Gas and Metro",
    dateISO: dayjs("2025-01-12").toISOString(),
  },
  {
    id: nanoid(),
    type: "Expense",
    amount: 150,
    category: "Entertainment",
    description: "Movies & Dining",
    dateISO: dayjs("2025-01-18").toISOString(),
  },
];

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    items: initialTransactions,
  },
  reducers: {
    addTransaction: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ type, amount, category, description, date }) {
        const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;
        const dateISO = dayjs(date).toISOString();
        return {
          payload: {
            id: nanoid(),
            type,
            amount: Number.isFinite(parsedAmount) ? parsedAmount : 0,
            category,
            description: description || "",
            dateISO,
          },
        };
      },
    },
    deleteTransaction(state, action) {
      const id = action.payload;
      state.items = state.items.filter((t) => t.id !== id);
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionsSlice.actions;

// Selectors
export const selectTransactions = (state) => state.transactions.items;

export const selectTotals = (state) => {
  const items = state.transactions.items;
  let income = 0;
  let expenses = 0;
  for (const t of items) {
    if (t.type === "Income") income += t.amount;
    else expenses += t.amount;
  }
  return {
    incomeTotal: income,
    expensesTotal: expenses,
    transactionsCount: items.length,
    balance: income - expenses,
  };
};

export const selectSpendingByCategoryData = (state) => {
  const items = state.transactions.items.filter((t) => t.type === "Expense");
  const totalsByCategory = new Map();
  for (const t of items) {
    totalsByCategory.set(t.category, (totalsByCategory.get(t.category) || 0) + t.amount);
  }
  return Array.from(totalsByCategory.entries()).map(([name, value]) => ({ name, value }));
};

export const selectIncomeVsExpensesData = (state) => {
  const items = state.transactions.items;
  if (items.length === 0) return [];

  const minDate = items.reduce((min, t) => Math.min(min, new Date(t.dateISO).getTime()), Infinity);
  const maxDate = items.reduce((max, t) => Math.max(max, new Date(t.dateISO).getTime()), -Infinity);

  const start = dayjs(minDate).startOf("day");
  const end = dayjs(maxDate).endOf("day");

  const dayCount = end.diff(start, "day") + 1;
  const data = [];

  for (let i = 0; i < dayCount; i++) {
    const d = start.add(i, "day");
    const label = d.format("MMM D");
    data.push({ label, income: 0, expenses: 0 });
  }

  const indexByLabel = new Map(data.map((d, idx) => [d.label, idx]));

  for (const t of items) {
    const label = dayjs(t.dateISO).format("MMM D");
    const idx = indexByLabel.get(label);
    if (idx == null) continue;
    if (t.type === "Income") data[idx].income += t.amount;
    else data[idx].expenses += t.amount;
  }

  return data;
};

export default transactionsSlice.reducer;