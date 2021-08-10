import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { MainScreen, MainScreenOptions } from "./screens"
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
  </Stack.Navigator>
)

export default MainNavigator