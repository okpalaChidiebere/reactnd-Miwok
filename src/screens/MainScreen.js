import React, { createRef } from "react"
import { Text, View, StyleSheet, Dimensions }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue
} from "react-native-reanimated"
import { Colors, Strings } from "../values"
import { NumbersScreen } from "./NumbersScreen"
import { FamilyScreen } from "./FamilyScreen"
import { ColorsScreen } from "./ColorsScreen"
import { PhrasesScreen } from "./PhrasesScreen"

const { width, height } = Dimensions.get("window")
const tabScreens = { 
  [Strings.category_numbers]: {
    getFragment(key){
      return <NumbersScreen key={key} containerStyle={styles.page}/>
    }
  },
  [Strings.category_family]: {
    getFragment(key){
      return <FamilyScreen key={key} containerStyle={styles.page}/>
    }
  },
  [Strings.category_colors]: {
    getFragment(key){
      return <ColorsScreen key={key} containerStyle={styles.page}/>
    }
  },
  [Strings.category_phrases]: {
    getFragment(key){
      return <PhrasesScreen key={key} containerStyle={styles.page}/>
    }
  },
}

export function MainScreen({ navigation, }){

  const scrollX = useSharedValue(0)
  const { container } = useTheme()

  return (
    <SafeAreaView style={[container, { backgroundColor: Colors.tan_background }]} edges={["bottom", "left", "right"]}>
      <Animated.ScrollView
        style={container} /** we want the scrollView to fill up the outside space*/
        pagingEnabled /** makes pages based upon the width and the height of the scrollView. In our case, its the whole screen*/
        horizontal /** enable horizonatal scroll for this */
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        bounces={false} /** we want to remove the bounce at the end or begining of the scrollView. This will make this act really like a tab! */
        onScroll={useAnimatedScrollHandler(e => {
          //because we are scrolling horizontally we choose the x offset
          scrollX.value = e.contentOffset.x
        })}
      >
        {Object.keys(tabScreens).map(key => tabScreens[key].getFragment(key))}
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    width, 
    height,
  }
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