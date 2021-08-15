import React, { useEffect, useState, forwardRef, useRef } from "react"
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import Animated, { 
    useAnimatedStyle, 
    interpolate, 
    useAnimatedReaction, 
    runOnJS
 } from "react-native-reanimated"
import tabScreens from "../utils/tabUtils"
import { Colors } from "../values"

const { width } = Dimensions.get("window")

/**
 * FYI with the help of forwardRef we can forwared the reference of a child 
 * component( eg this component) to its parent cmponent(TabView) 
 * */
const CategoryTab = forwardRef(({ tabScreen, onTabItemPress, scrollX, tabStablePosition }, ref ) => {
    const [active, setActive] = useState(false)

    const returningWorklet = (result)  => {
        if (result === tabStablePosition) {
            setActive(true)
        }else{
            setActive(false)
        }
    }

    //learn more about useAnimatedReaction here https://docs.swmansion.com/react-native-reanimated/docs/api/useAnimatedReaction
    const derived = useAnimatedReaction(() => {
        return scrollX.value
      }, (result, previous) => {
          /**
           * FYI: if you want to run a function that is from a external package inside reanimated Hooks, you must use runOnJS
           * An excection like react-native-redash where the methods are marked as worklets themseleves,
           * you dont need ti
           * 
           * if your own defined function that you dont run any eternal package, then you can use worklet directly
           */
            runOnJS(returningWorklet)(result)
      }, [])

    return (
        <TouchableOpacity onPress={onTabItemPress}>
            <View ref={ref}>
                <Animated.Text 
                    style={[
                        styles.tabText, 
                        active ? styles.activeTabText : styles.inActiveTabText,
                    ]}
                >
                    {tabScreen.key}
                </Animated.Text>
            </View>
        </TouchableOpacity>
    )
})

const TabIndicator = ({ measures, scrollX }) => {
    /**
     * Remember that:
     * The stable position for tabScreen 1 is 0
     * The stable position for tabScreen2 is width
     * The stable position for tabScreen2 is width * 2
     * and so on...
     * 
     * we will end up having inputRange of [0, width, width * 2, ...]
     */
    const inputRange = tabScreens.map((_, i) => i * width)

    const animatedTabIndicatorStyle = useAnimatedStyle(() => {
        const tabIndicatorWidth = interpolate(
            scrollX.value,
            inputRange,
            measures.map(measure => measure.width),
        )
        
        const tabIndicatorPositionLeft = interpolate(
            scrollX.value,
            inputRange,
            measures.map(measure => measure.x), //we get the x value this time
        )

        return {
            width: tabIndicatorWidth,
            left: tabIndicatorPositionLeft,
            //transform: [{ translateX: tabIndicatorPosition }] //this work will work as well
        }
    })

    return (
        <Animated.View 
            style={[
                styles.tabIndicator,
                animatedTabIndicatorStyle,
            ]}
        />
    )
}

export function TabView({ scrollX, onTabItemPress }){
    /**
     * With measureLyout we need to specify the relative node in order to measure.
     * It could be window, screen or a container. But in our case, its the TabView(that is a container to our CategoryTabs)
     * This is why we created this ref that we will pass to the measureLayout for each 
     * CategoryTab as we want to measure their positions
     */
    const tabViewRef = useRef()
    const [measures, setMeasures] = useState() //stores measurements for out Tab items which we will pass to the TabIndicator
    useEffect(() => {
        const m = [] //we will populate the temp array in our onSuccess callback

        /**
         * We want to measure the layout(x, y, height, width) for each CartegoryTab in relation to this component 
         * (the parent container for CartegoryTab) before this component(TabView) mounts
         */
        tabScreens.forEach(tabScreen => {
            tabScreen.ref.current.measureLayout(
                tabViewRef.current,
                //on measurement success callback function
                (x, y, width, height) => {
                    m.push({ x, y, width, height })

                    //check if we are done getting measurement for each CategoryTabs
                    if(m.length === tabScreens.length){
                        setMeasures(m) //set the measures state with all our measurements
                    }
                },
            )
        })
    }, [])
    return (
        <View ref={tabViewRef} style={styles.tabView}>
            {tabScreens.map((tabScreen, index) => {
                return (
                    <CategoryTab 
                        key={tabScreen.key} 
                        tabScreen={tabScreen} 
                        ref={tabScreen.ref} 
                        scrollX={scrollX}
                        tabStablePosition={index * width}
                        onTabItemPress={() => onTabItemPress(index)/** we want to get the exact categoryTab clicked so that we can scroll the scrollview to desired position */}
                    />
                )
            })}
            {measures && <TabIndicator measures={measures} scrollX={scrollX} />}
        </View>
    )
}

const styles = StyleSheet.create({
    tabView: {
        justifyContent: "space-evenly", 
        flexDirection: "row",
        width: "100%",
        top: 0,
        backgroundColor: Colors.primary_color,
    },
    tabText: {
        textTransform: "uppercase",
        paddingHorizontal: 10,
        fontSize: 18,
        marginVertical: 10,
        fontSize: 64/tabScreens.length, /** we want to grow or shrink the category fontSize based on data length */ 
    },
    tabIndicator: {
        position: "absolute",
        height: 4,
        left: 0,
        width: 100, //we will change this indicator width later
        backgroundColor: Colors.white,
        bottom: 0,
    },
    activeTabText: {
        color: Colors.white,
    },
    inActiveTabText: {
        color: "#9E9E9E",
    }
})

