import React from "react"
import { View, StyleSheet, FlatList }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings, Dimens } from "../values"
import Word from "../data/word"
import { ListItem } from "../components"

export function FamilyScreen(){

  const { container } = useTheme()

  // Create a list of words
  const words = []
  words.push(new Word("father", "әpә"))
  words.push(new Word("mother", "әṭa"))
  words.push(new Word("son", "angsi"))
  words.push(new Word("daughter", "tune"))
  words.push(new Word("older brother", "taachi"))
  words.push(new Word("younger brother", "chalitti"))
  words.push(new Word("older sister", "teṭe"))
  words.push(new Word("younger sister", "kolliti"))
  words.push(new Word("grandmother ", "ama"))
  words.push(new Word("grandfather", "paapa"))
  

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

export function FamilyScreenOptions(){
  return {
      title: Strings.category_family,
      headerTintColor: Colors.white,
      headerBackTitleVisible: false,
      headerMode: "screen",
      headerStyle: { 
        backgroundColor: Colors.primary_color,
      },
  }
}