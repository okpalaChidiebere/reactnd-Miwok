import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { 
  MainScreen, MainScreenOptions,
  ColorsScreen, ColorsScreenOptions,
  FamilyScreen, FamilyScreenOptions,
  NumbersScreen, NumbersScreenOptions,
  PhrasesScreen, PhrasesScreenOptions,
 } from "./screens"
import { Strings } from "./values"

const Stack = createStackNavigator()
const MainNavigator = () => (
  <Stack.Navigator 
    initialRouteName={Strings.screen_main}
  >
    <Stack.Screen
      name={Strings.screen_main}
      component={MainScreen}
      options={MainScreenOptions}
    />
     <Stack.Screen
        name={Strings.category_numbers}
        component={NumbersScreen}
        options={NumbersScreenOptions}
    />
    <Stack.Screen
        name={Strings.category_family}
        component={FamilyScreen}
        options={FamilyScreenOptions}
    />
    <Stack.Screen
        name={Strings.category_colors}
        component={ColorsScreen}
        options={ColorsScreenOptions}
    />
    <Stack.Screen
        name={Strings.category_phrases}
        component={PhrasesScreen}
        options={PhrasesScreenOptions}
    />
  </Stack.Navigator>
)

export default MainNavigator