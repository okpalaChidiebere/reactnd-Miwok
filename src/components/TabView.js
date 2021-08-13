import React, { useEffect, forwardRef } from "react"
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
    useEffect(() => {
        /**
         * We want to measure the layout(x, y, height, width) for each CartegoryTab in relation to this component 
         * (the parent container for CartegoryTab) before this component(TabView) mounts
         */
        tabScreens.forEach(tabScreen => {
            //tabScreen.ref.current.measureLayout()
        })
    }, [])
    return (
        <View style={styles.tabView}>
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

