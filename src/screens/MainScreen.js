import React from "react"
import { Text, View, StyleSheet, Pressable }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings } from "../values"

export function MainScreen({ navigation, }){

  const { categoryStyle, container } = useTheme()

  return (
    <SafeAreaView style={container} edges={["bottom", "left", "right"]}>
      <View style={styles.content}>
        <Pressable onPress={() => navigation.navigate(Strings.category_numbers)}>
          <Text
            style={[categoryStyle, { backgroundColor: Colors.category_numbers }]}
          >
            {Strings.category_numbers}
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(Strings.category_family)}>
          <Text
            style={[categoryStyle, { backgroundColor: Colors.category_family }]}
          >
            {Strings.category_family}
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(Strings.category_colors)}>
          <Text
            style={[categoryStyle, { backgroundColor: Colors.category_colors }]}
          >
            {Strings.category_colors}
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(Strings.category_phrases)}>
          <Text
            style={[categoryStyle, { backgroundColor: Colors.category_phrases }]}
          >
            {Strings.category_phrases}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "flex-start",
  },
})

export function MainScreenOptions(){
  return {
      title: Strings.app_name,
      headerTintColor: Colors.white,
      headerMode: "screen",
      headerStyle: { 
        backgroundColor: Colors.primary_color,
      },
  }
}