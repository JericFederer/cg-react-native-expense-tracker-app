import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpense from '@/screens/ManageExpense';
import RecentExpenses from '@/screens/RecentExpenses';
import AllExpenses from '@/screens/AllExpenses';
import { GlobalStyles } from '@/constants/style';

// * NAVIGATION
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// * NAVIGATION - BOTTOM TABS
function ExpensesOverview() {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerStyle: { backgroundColor: GlobalStyles.armyColorPalette.primary50 },
      headerTintColor: "white",
      tabBarStyle: { backgroundColor: GlobalStyles.armyColorPalette.primary50 },
      tabBarActiveTintColor: GlobalStyles.armyColorPalette.accent500,
    }}>
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
      <StatusBar style="auto" />
      <NavigationContainer independent={ true }>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ ExpensesOverview }
            options={{ headerShown: false }}
          /> 
          <Stack.Screen
            name="ManageExpense"
            component={ ManageExpense }
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}