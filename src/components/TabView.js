import React, { useEffect, useState, forwardRef, useRef } from "react"
import { View, StyleSheet, Text } from "react-native"
import tabScreens from "../utils/tabUtils"
import { Colors } from "../values"

/**
 * FYI with the help of forwardRef we can forwared the reference of a child 
 * component( eg this component) to its parent cmponent(TabView) 
 * */
const CategoryTab = forwardRef(({ tabScreen }, ref ) => {
    return (
        <View ref={ref}>
          <Text style={styles.tabText}>{tabScreen.key}</Text>
        </View>
    )
})

const TabIndicator = () => {
    return (
        <View style={styles.tabIndicator} />
    )
}

export function TabView(){
    /**
     * With measureLyout we need to specify the relative node in order to measure.
     * It could be window, screen or a container. But in our case, its the TabView(that is a container to our CategoryTabs)
     * This is why we created this ref that we will pass to the measureLayout for each 
     * CategoryTab as we want to measure their positions
     */
    const tabViewRef = useRef()
    const [measures, setMeasures] = useState([]) //stores measurements for out Tab items which we will pass to the TabIndicator
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
            {tabScreens.map(tabScreen => <CategoryTab key={tabScreen.key} tabScreen={tabScreen} ref={tabScreen.ref} />)}
            <TabIndicator />
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
        color: Colors.white,
        textTransform: "uppercase",
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
    }
})

