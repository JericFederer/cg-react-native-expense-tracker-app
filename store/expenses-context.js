import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "An electronic piano keyboard",
    amount: 9999,
    date: new Date("2024-05-23")
  },
  {
    id: "e2",
    description: "An electronic mini piano keyboard",
    amount: 999,
    date: new Date("2024-05-22")
  },
  {
    id: "e3",
    description: "A piano figurine",
    amount: 99,
    date: new Date("2024-05-11")
  },
  {
    id: "e4",
    description: "A piano composition book",
    amount: 369,
    date: new Date("2024-05-11")
  },
  {
    id: "e5",
    description: "An electronic piano keyboard",
    amount: 9999,
    date: new Date("2024-05-11")
  },
  {
    id: "e6",
    description: "An electronic mini piano keyboard",
    amount: 999,
    date: new Date("2024-05-11")
  },
  {
    id: "e7",
    description: "A piano figurine",
    amount: 99,
    date: new Date("2024-05-11")
  },
  {
    id: "e8",
    description: "A piano composition book",
    amount: 369,
    date: new Date("2024-05-11")
  },
  {
    id: "e9",
    description: "An electronic piano keyboard",
    amount: 9999,
    date: new Date("2024-05-11")
  },
  {
    id: "e10",
    description: "An electronic mini piano keyboard",
    amount: 999,
    date: new Date("2024-05-11")
  },
  {
    id: "e11",
    description: "A piano figurine",
    amount: 99,
    date: new Date("2024-05-11")
  },
  {
    id: "e12",
    description: "A piano composition book",
    amount: 369,
    date: new Date("2024-05-11")
  },
  {
    id: "e13",
    description: "An electronic piano keyboard",
    amount: 9999,
    date: new Date("2024-05-11")
  },
  {
    id: "e14",
    description: "An electronic mini piano keyboard",
    amount: 999,
    date: new Date("2024-05-11")
  },
  {
    id: "e15",
    description: "A piano figurine",
    amount: 99,
    date: new Date("2024-05-11")
  },
  {
    id: "e16",
    description: "A piano composition book",
    amount: 369,
    date: new Date("2024-05-20")
  }
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  }

  return (
    <ExpensesContext.Provider value={ value }>
      { children }
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider;
