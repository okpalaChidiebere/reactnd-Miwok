import React, { createRef } from "react"
import { Text, View, StyleSheet, Pressable }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import ViewPager from "react-native-pager-view"
import { Colors, Strings } from "../values"
import { NumbersScreen } from "./NumbersScreen"
import { FamilyScreen } from "./FamilyScreen"
import { ColorsScreen } from "./ColorsScreen"
import { PhrasesScreen } from "./PhrasesScreen"


const fragments = { 
  [Strings.category_numbers]: {
    getFragment(key){
      return <NumbersScreen key={key}/>
    }
  },
  [Strings.category_family]: {
    getFragment(key){
      return <FamilyScreen key={key}/>
    }
  },
  [Strings.category_colors]: {
    getFragment(key){
      return <ColorsScreen key={key}/>
    }
  },
  [Strings.category_phrases]: {
    getFragment(key){
      return <PhrasesScreen key={key}/>
    }
  },
}
export function MainScreen({ navigation, }){

  const { categoryStyle, container } = useTheme()

  return (
    <SafeAreaView style={[container, { backgroundColor: Colors.tan_background }]} edges={["bottom", "left", "right"]}>
      <ViewPager style={container} initialPage={0}>
        {Object.keys(fragments).map(key => {
          return fragments[key].getFragment(key)
        })}
      </ViewPager>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "flex-start",
  },
  viewPager: {
    flex: 1,
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