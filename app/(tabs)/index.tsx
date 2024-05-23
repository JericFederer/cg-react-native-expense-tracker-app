import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpense from '@/screens/ManageExpense';
import RecentExpenses from '@/screens/RecentExpenses';
import AllExpenses from '@/screens/AllExpenses';
import { GlobalStyles } from '@/constants/style';
import IconButton from '@/components/UI/IconButtons';

// * NAVIGATION
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// * NAVIGATION - BOTTOM TABS
function ExpensesOverview() {
  return (
    <BottomTabs.Navigator screenOptions={ ({ navigation }) => {
      return {
        headerStyle: { backgroundColor: GlobalStyles.armyColorPalette.primary50 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.armyColorPalette.primary50 },
        tabBarActiveTintColor: GlobalStyles.armyColorPalette.accent500,
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon="add"
              size={ 24 }
              color={ tintColor }
              onPress={ () => {
                navigation.navigate('ManageExpense')
              } }
            />
          )
        }
      }
    } }>
      <BottomTabs.Screen 
        name="RecentExpenses"
        component={ RecentExpenses }
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="hourglass"
                size={ size } 
                color={ color }
              />
            )
          }
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={ AllExpenses }
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="calendar"
                size={ size } 
                color={ color }
              />
            )
          }
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="inverted" />
      <NavigationContainer independent={ true }>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.armyColorPalette.primary500
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ ExpensesOverview }
            options={{ headerShown: false }}
          /> 
          <Stack.Screen
            name="ManageExpense"
            component={ ManageExpense }
            options={{
              presentation: "modal"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}