import { View, Text, StyleSheet, FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';
import { getFormattedDate } from '@/util/date';

// * HANDLERS
function renderExpenseItemHandler(itemData) {
  return (
    <ExpenseItem
      id={ itemData.item.id }
      description={ itemData.item.description }
      date={ getFormattedDate(itemData.item.date) }
      amount={ itemData.item.amount }
    />
  )
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={ expenses }
      renderItem={ renderExpenseItemHandler }
      keyExtractor={ (item) => item.id }
    />
  )
}

export default ExpensesList;