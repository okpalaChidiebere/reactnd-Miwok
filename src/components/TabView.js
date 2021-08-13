import React from "react"
import { View, StyleSheet, Text } from "react-native"
import tabScreens from "../utils/tabUtils"
import { Colors } from "../values"

const CategoryTab = ({ tabScreen }) => {
    return (
        <View>
          <Text style={styles.tabText}>{tabScreen.key}</Text>
        </View>
    )
}

const TabIndicator = () => {
    return (
        <View style={styles.tabIndicator} />
    )
}

export function TabView(){
    return (
        <View style={styles.tabView}>
            {tabScreens.map(tabScreen => <CategoryTab key={tabScreen.key} tabScreen={tabScreen}/>)}
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

