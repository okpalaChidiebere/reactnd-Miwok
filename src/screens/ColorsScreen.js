import React from "react"
import { View, StyleSheet, FlatList }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings, Dimens } from "../values"
import Word from "../data/word"
import { ListItem } from "../components"

export function ColorsScreen(){

  const { container } = useTheme()

  // Create a list of words
  const words = []
  words.push(new Word("red", "weṭeṭṭi", require("../assets/images/drawable-mdpi/color_red.png")))
  words.push(new Word("mustard yellow", "chiwiiṭә", require("../assets/images/drawable-mdpi/color_mustard_yellow.png")))
  words.push(new Word("dusty yellow", "ṭopiisә", require("../assets/images/drawable-mdpi/color_dusty_yellow.png")))
  words.push(new Word("green", "chokokki", require("../assets/images/drawable-mdpi/color_green.png")))
  words.push(new Word("brown", "ṭakaakki", require("../assets/images/drawable-mdpi/color_brown.png")))
  words.push(new Word("gray", "ṭopoppi", require("../assets/images/drawable-mdpi/color_gray.png")))
  words.push(new Word("black", "kululli", require("../assets/images/drawable-mdpi/color_black.png")))
  words.push(new Word("white", "kelelli", require("../assets/images/drawable-mdpi/color_white.png")))

  return (
    <SafeAreaView style={container} edges={["bottom", "left", "right"]}>
      <View style={styles.content}>
        <FlatList 
          data={words}
          renderItem={({ item }) => <ListItem item={item}/>}
          getItemLayout={(_, index) => ({
            length: Dimens.list_item_height + Dimens.word_list_item_separator_height, 
            offset: Dimens.list_item_height + Dimens.word_list_item_separator_height * index,
            index,
          })}
          keyExtractor={item => item.getDefaultTranslation}
          ItemSeparatorComponent={ () => <View style={{height:Dimens.word_list_item_separator_height, backgroundColor: Colors.colorDivider, marginLeft:8, marginRight:8}}/> }
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "flex-start",
  },
})

export function ColorsScreenOptions(){
  return {
      title: Strings.category_colors,
      headerTintColor: Colors.white,
      headerBackTitleVisible: false,
      headerMode: "screen",
      headerStyle: { 
        backgroundColor: Colors.primary_color,
      },
  }
}