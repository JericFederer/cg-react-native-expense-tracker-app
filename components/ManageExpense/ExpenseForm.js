import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useState } from 'react';

import Input from './Input';
import { GlobalStyles } from '@/constants/style';
import Button from '@/components/UI/Button';
import { getFormattedDate } from '@/util/date';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  // * STATES
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true,
    }
  });
  
  // * HANDLERS
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    // * Validation
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = !expenseData.date.toString().includes("Invalid");
    const descriptionIsValid = expenseData.description.trim().length > 0;

    console.log(expenseData.date.toString(), dateIsValid)

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((curInputs) => {
        return (
          {
            amount: {
              value: curInputs.amount.value,
              isValid: amountIsValid,
            },
            date: {
              value: curInputs.date.value,
              isValid: dateIsValid,
            },
            description: {
              value: curInputs.description.value,
              isValid: descriptionIsValid,
            },
          }
        )
      })

      return;
    }

    onSubmit(expenseData);
  }

  // * Checks if form submitted is valid
  const formIsInvalid = 
      !inputs.amount.isValid || 
      !inputs.date.isValid ||
      !inputs.description.isValid;

  return (
    <KeyboardAvoidingView behavior='position' style={{ flex: 1 }}>
      <ScrollView>
        <View style={ styles.form }>
          <Text style={ styles.title }>Your Expense</Text>
          <View style={ styles.inputsRow }>
            <Input
              label="Amount"
              style={ styles.rowInput }
              invalid={ !inputs.amount.isValid }
              textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangedHandler.bind(this, "amount"),
                value: inputs.amount.value,
              }}
            />
            
            <Input
              label="Date"
              style={ styles.rowInput }
              invalid={ !inputs.date.isValid }
              textInputConfig={{
                placeholder: "YYYY-MM-DD",
                maxLength: 10,
                onChangeText: inputChangedHandler.bind(this, "date"),
                value: inputs.date.value,
              }}  
            />
          </View>

          <Input
            label="Description"
            invalid={ !inputs.description.isValid }
            textInputConfig={{
              multiline: true,
              autoCorrect: false,
              autoCapitalize: "sentences",
              onChangeText: inputChangedHandler.bind(this, "description"),
              value: inputs.description.value,
            }}  
          />

          {
            formIsInvalid && <Text style={ styles.errorText }>
              Invalid input -- Please check your input values.
            </Text>
          }

          <View style={ styles.buttons }>
            <Button
              mode="flat"
              onPress={ onCancel }
              style={ styles.button }
            >
              Cancel
            </Button>

            <Button
              onPress={ submitHandler }
              style={ styles.button }
            >
              { submitButtonLabel }
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
    color: GlobalStyles.armyColorPalette.accent700,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.armyColorPalette.error500,
    margin: 8,
  },
});