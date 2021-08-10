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
      title: Strings.category_numbers,
      headerTintColor: Colors.white,
      headerMode: "screen",
      headerStyle: { 
        backgroundColor: Colors.primary_color,
      },
  }
}