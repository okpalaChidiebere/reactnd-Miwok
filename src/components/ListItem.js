import React from "react"
import { View, Text }  from "react-native"

/** {@link ListItem} will display list items for each {@link Word} in the list. */
export function ListItem({ item }){
    return (
        <View style={{ padding: 16, flex: 1 }}>
            <Text>{item.getDefaultTranslation}</Text>
            <Text>{item.getMiwokTranslation}</Text>
        </View>
    )
}