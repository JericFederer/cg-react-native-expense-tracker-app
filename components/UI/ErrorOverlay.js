import { View, Text, StyleSheet, Button } from 'react-native';

import { GlobalStyles } from '../../constants/style';

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={ styles.container }>
      <Text style={ [styles.text, styles.title] }>An error occurred!</Text>
      <Text style={ styles.text }>{ message }</Text>
      <Button
        onPress={ onConfirm }
        title='OK'
        color={ GlobalStyles.armyColorPalette.primary50 }
      />
    </View>
  )
} 

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.armyColorPalette.primary700,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: GlobalStyles.armyColorPalette.accent700,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalStyles.armyColorPalette.accent700,
  },
  message: {
    fontSize: 14,
    color: GlobalStyles.armyColorPalette.accent700,
  }
});