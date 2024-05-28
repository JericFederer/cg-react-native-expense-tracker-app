import { View, StyleSheet } from 'react-native';
import { useLayoutEffect, useContext, useState } from 'react';

import IconButton from '@/components/UI/IconButton';
import { GlobalStyles } from '@/constants/style';
import { ExpensesContext } from '@/store/expenses-context';
import ExpenseForm from '@/components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '@/util/http';
import LoadingOverlay from '@/components/UI/LoadingOverlay';
import ErrorOverlay from '@/components/UI/ErrorOverlay';

function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  // * UseState
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(); 

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
  function errorHandler() {
    setError(null);
  }

  async function deleteExpenseHandler() {
    setIsSubmitting(true);

    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete the expense!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    try {
      if (isEditing) {
        expenseCtx.updateExpense(
          editedExpenseId,
          expenseData,
        );
  
        setIsSubmitting(true);
  
        await updateExpense(
          editedExpenseId,
          expenseData,
        );
      } else {
        // * POST data to Firebase Database
        const id = await storeExpense(expenseData);
        
        setIsSubmitting(true);
  
        expenseCtx.addExpense({ ...expenseData, id: id });
      }

      navigation.goBack();
    } catch (error) {
      setError('Could not save data!');
      setIsSubmitting(false);
    }

    
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay
      message={ error }
      onConfirm={ errorHandler }
    />
  }

  if (isSubmitting) {
    return <LoadingOverlay />
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