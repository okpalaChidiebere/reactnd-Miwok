import React, { useRef, useCallback } from "react"
import { Dimensions } from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue,
} from "react-native-reanimated"
import { Colors, Strings } from "../values"
import tabScreens from "../utils/tabUtils"
import { TabView } from "../components"

const  { width } = Dimensions.get("screen")

export function MainScreen({ navigation, }){

  const scrollX = useSharedValue(0)
  const { container } = useTheme()
  const scrollViewRef = useRef()

  /** we want to when a tab is pressed, we want to go to the particular caursel */
  const handleOnTabItemPress = useCallback((itemIndex) => {
    //we scroll to offSet with the help of the reference from the flatlist
    scrollViewRef.current.scrollTo({ 
      x: itemIndex * width
    })
  })

  return (
    <SafeAreaView style={[container, { backgroundColor: Colors.tan_background }]} edges={["bottom", "left", "right"]}>
      <TabView scrollX={scrollX} onTabItemPress={handleOnTabItemPress}/>
      <Animated.ScrollView
        ref={scrollViewRef}
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
        {tabScreens.map(tabScreen => tabScreen.getFragment(tabScreen.key))}
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

export function MainScreenOptions(){
  return {
      title: Strings.app_name,
      headerTintColor: Colors.white,
      headerMode: "screen",
      headerStyle: { 
        backgroundColor: Colors.primary_color,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, 
      },
  }
}