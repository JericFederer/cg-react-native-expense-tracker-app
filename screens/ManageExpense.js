import { View, Text, StyleSheet } from 'react-native';
import { useLayoutEffect, useContext } from 'react';

import IconButton from '@/components/UI/IconButton';
import { GlobalStyles } from '@/constants/style';
import { ExpensesContext } from '@/store/expenses-context';
import ExpenseForm from '@/components/ManageExpense/ExpenseForm';

function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;


  // * UseContext
  const expenseCtx = useContext(ExpensesContext);
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  
  // * UseLayout
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    });
    navigation.setOptions({
    }, [navigation, isEditing])
  }); //: useLayoutEffect

  // * HANDLERS
  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      expenseCtx.updateExpense(
        editedExpenseId,
        expenseData
      );
    } else {
      expenseCtx.addExpense(expenseData);
    }

    navigation.goBack();
  }

  return (
    <View style={ styles.container }>
      <ExpenseForm
        submitButtonLabel={ isEditing ? "Update" : "Add" }
        onSubmit={ confirmHandler }
        onCancel={ cancelHandler }
        defaultValues={ selectedExpense }
      />

      { 
        isEditing &&
        <View style={ styles.deleteContainer }>
          <IconButton
            icon="trash"  
            color={ GlobalStyles.armyColorPalette.error500 }
            size={ 36 }
            onPress={ deleteExpenseHandler }
          />
        </View>
      }
    </View>
  )
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.armyColorPalette.primary100,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.armyColorPalette.accent500,
    alignItems: 'center',
  },
});