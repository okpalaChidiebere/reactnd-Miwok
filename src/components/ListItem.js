import React from "react"
import { View, Text, Image, StyleSheet, TouchableNativeFeedback, Platform, TouchableHighlight }  from "react-native"
import { AntDesign as Icon } from "@expo/vector-icons"
import { Colors, Dimens } from "../values"

/** {@link ListItem} will display list items for each {@link Word} in the list. */
export function ListItem({ item, style, onPress, index }){
    return (
        Platform.OS === "android"
        ? (
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#E0E0E0", false)} onPress={() => onPress(index)}>
                <View style={styles.container} >
                    {item.getImageResourceId && <Image source={item.getImageResourceId} width={Dimens.list_item_height} height={Dimens.list_item_height}/>}
                    <View style={[styles.textWrapper, style]}>
                        <Text style={[styles.text, { fontWeight:"bold" }]}>{item.getDefaultTranslation}</Text>
                        <Text style={styles.text}>{item.getMiwokTranslation}</Text>
                    </View>
                    <Icon name="caretright" size={24} color="white" style={{ top: 30, bottom: 0, right:10,  position:"absolute" }}/>
                </View>
            </TouchableNativeFeedback>
        )
        : (
            <TouchableHighlight underlayColor="#E0E0E0" onPress={() => onPress(index)}>
                <View style={styles.container} >
                    {item.getImageResourceId && <Image source={item.getImageResourceId} width={Dimens.list_item_height} height={Dimens.list_item_height}/>}
                    <View style={[styles.textWrapper, style]}>
                        <Text style={[styles.text, { fontWeight:"bold" }]}>{item.getDefaultTranslation}</Text>
                        <Text style={styles.text}>{item.getMiwokTranslation}</Text>
                    </View>
                    <Icon name="caretright" size={24} color="white" style={{ top: 30, bottom: 0, right:10,  position:"absolute" }}/>
                </View>
            </TouchableHighlight>
        )
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        flexDirection: "row", 
        alignItems:"center", 
        minHeight: Dimens.list_item_height, //the height should be atleast 88. It gorw bigger than that depending on the text inside
        backgroundColor: Colors.tan_background,
    },
    textWrapper: { 
        paddingLeft: 16, 
        width:"100%", //in real app, you will want to measure the widht of this from the Dimensions.width
        height: "100%", 
        justifyContent:"center",
    },
    text: { 
        color: "#fff", 
        fontSize: 18/**textAppearanceMedium */ 
    }
})