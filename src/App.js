import React from "react"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Styles, Colors } from "./values"
import MainNavigator from "./MainNavigation"


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={Styles}>
        <StatusBar style="light" backgroundColor={Colors.primary_dark_color}/>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}