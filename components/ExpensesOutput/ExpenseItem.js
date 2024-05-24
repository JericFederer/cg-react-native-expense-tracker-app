import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

import { GlobalStyles } from '../../constants/style';

function ExpenseItem({ id, description, date, amount }) {
  // * NAVIGATION
  const navigation = useNavigation();

  // * HANDLERS
  function expensePressHandler() {
    navigation.navigate(
      'ManageExpense',
      {
        expenseId: id
      }
    )
  }

  return (
    <Pressable
      onPress={ expensePressHandler }
      style={ ({ pressed }) => pressed && styles.pressed }
    >
      <View style={ styles.expenseItem }>
        <View style={ styles.descriptionDateContainer }>
          <Text style={ [styles.textBase, styles.description] }>{ description }</Text>
          <Text style={ styles.textBase }>{ (date) }</Text>
        </View>

        <View style={ styles.amountContainer }>
          <Text style={ styles.amount }>{ amount.toFixed(2) }</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.armyColorPalette.primary65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 10,
    shadowColor: GlobalStyles.armyColorPalette.primary100,
    shadowRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
  },
  textBase: {
    color: GlobalStyles.armyColorPalette.accent700
  },
  descriptionDateContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.armyColorPalette.primary50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.armyColorPalette.accent700
  }
});