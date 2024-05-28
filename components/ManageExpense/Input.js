import { View, Text, TextInput, StyleSheet } from 'react-native';

import { GlobalStyles } from '@/constants/style';

function Input({ label, invalid, style, textInputConfig }) {
  const inputStyles = [
    styles.input,
  ]

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={ [styles.inputContainer, style] }>
        <Text style={ [styles.label, invalid && styles.invalidLabel] }>{ label }</Text>
        <TextInput style={ inputStyles } { ...textInputConfig } />
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.armyColorPalette.accent500,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.armyColorPalette.accent500,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.armyColorPalette.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.armyColorPalette.error500,
  },
  invalidInput: {
    color: GlobalStyles.armyColorPalette.error50,
  },
});