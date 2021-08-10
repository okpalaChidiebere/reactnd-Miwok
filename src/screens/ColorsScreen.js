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
  words.push(new Word("red", "weṭeṭṭi"))
  words.push(new Word("mustard yellow", "chiwiiṭә"))
  words.push(new Word("dusty yellow", "ṭopiisә"))
  words.push(new Word("green", "chokokki"))
  words.push(new Word("brown", "ṭakaakki"))
  words.push(new Word("gray", "ṭopoppi"))
  words.push(new Word("black", "kululli"))
  words.push(new Word("white", "kelelli"))

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