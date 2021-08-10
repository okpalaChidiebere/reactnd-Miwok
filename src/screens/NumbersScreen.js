import React from "react"
import { View, StyleSheet }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export function NumbersScreen(){

  const { container } = useTheme()

  return (
    <SafeAreaView style={container} edges={["bottom", "left", "right"]}>
      <View style={styles.content} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "flex-start",
  },
})

export function NumbersScreenOptions(){
  return {
    //learn more about the props you can configure here https://reactnavigation.org/docs/native-stack-navigator/#options
      title: Strings.category_numbers,
      headerTintColor: Colors.white,
      headerBackTitleVisible: false,
      headerMode: "screen",
      headerStyle: { 
        backgroundColor: Colors.primary_color,
      },
  }
}