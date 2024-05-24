import { View, StyleSheet } from 'react-native';

import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '@/constants/style';

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
    date: new Date("2024-05-21")
  },
  {
    id: "e4",
    description: "A piano composition book",
    amount: 369,
    date: new Date("2024-05-20")
  },
  {
    id: "e5",
    description: "An electronic piano keyboard",
    amount: 9999,
    date: new Date("2024-05-23")
  },
  {
    id: "e6",
    description: "An electronic mini piano keyboard",
    amount: 999,
    date: new Date("2024-05-22")
  },
  {
    id: "e7",
    description: "A piano figurine",
    amount: 99,
    date: new Date("2024-05-21")
  },
  {
    id: "e8",
    description: "A piano composition book",
    amount: 369,
    date: new Date("2024-05-20")
  },
  {
    id: "e9",
    description: "An electronic piano keyboard",
    amount: 9999,
    date: new Date("2024-05-23")
  },
  {
    id: "e10",
    description: "An electronic mini piano keyboard",
    amount: 999,
    date: new Date("2024-05-22")
  },
  {
    id: "e11",
    description: "A piano figurine",
    amount: 99,
    date: new Date("2024-05-21")
  },
  {
    id: "e12",
    description: "A piano composition book",
    amount: 369,
    date: new Date("2024-05-20")
  },
  {
    id: "e13",
    description: "An electronic piano keyboard",
    amount: 9999,
    date: new Date("2024-05-23")
  },
  {
    id: "e14",
    description: "An electronic mini piano keyboard",
    amount: 999,
    date: new Date("2024-05-22")
  },
  {
    id: "e15",
    description: "A piano figurine",
    amount: 99,
    date: new Date("2024-05-21")
  },
  {
    id: "e16",
    description: "A piano composition book",
    amount: 369,
    date: new Date("2024-05-20")
  }
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={ style.container }>
      <ExpensesSummary
        expenses={ expenses }
        // expenses={ DUMMY_EXPENSES }
        periodName={ expensesPeriod }
      />
      <ExpensesList
        expenses={ expenses }
        // expenses={ DUMMY_EXPENSES }
      />
    </View>
  )
}

export default ExpensesOutput;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: GlobalStyles.armyColorPalette.primary100,
  }
});