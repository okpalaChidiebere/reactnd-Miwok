import { DefaultTheme } from "@react-navigation/native"
import { Platform } from "react-native"
import { Colors } from "./colors"
import { Dimens } from "./dimens"

//https://reactnavigation.org/docs/themes#basic-usage
export const Styles = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        colorPrimary: Colors.primary_color,
        colorPrimaryDark: Colors.primary_dark_color,
    },
    container: {
      flex: 1,
      //backgroundColor: Colors.tan_background,
    },
    categoryStyle: {
        width:"100%",
        height: Dimens.list_item_height,
        color: Colors.white,
        padding: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        ...Platform.select({
            ios: {
                lineHeight: 60,
            },
            android: {
                textAlignVertical: "center",
            }
        }),        
    },
}
