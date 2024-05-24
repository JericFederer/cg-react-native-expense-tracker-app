import { GlobalStyles } from '@/constants/style';
import { View, Text, StyleSheet } from 'react-native';

function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, currentExpense) => {
    return sum + currentExpense.amount
  }, 0);

  return (
    <View style={ styles.container }>
      <Text style={ styles.period }>{ periodName }</Text>
      {/* "toFixed(2)" sets "expensesSum" to have 2 decimal places */}
      <Text style={ styles.sum }>{ expensesSum.toFixed(2) } JPY</Text> 
    </View>
  )
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.armyColorPalette.accent500,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.armyColorPalette.primary500,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.armyColorPalette.primary500,
  }
});