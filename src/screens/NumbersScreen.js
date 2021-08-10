import React from "react"
import { View, StyleSheet, FlatList }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Dimens, Strings } from "../values"
import Word from "../data/word"
import { ListItem } from "../components"

export function NumbersScreen(){

  const { container } = useTheme()
  const words = []
  words.push(new Word("one", "lutti"))
  words.push(new Word("two", "otiiko"))
  words.push(new Word("three", "tolookosu"))
  words.push(new Word("four", "oyyisa"))
  words.push(new Word("five", "massokka"))
  words.push(new Word("six", "temmokka"))
  words.push(new Word("seven", "kenekaku"))
  words.push(new Word("eight", "kawinta"))
  words.push(new Word("nine", "wo’e"))
  words.push(new Word("ten", "na’aacha"))

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

export function NumbersScreenOptions(){
  return {
    //learn more about the props you can configure here https://reactnavigation.org/docs/native-stack-navigator/#options
      title: Strings.category_numbers,
      headerTintColor: Colors.white,
      headerBackTitleVisible: false,
      headerMode: "screen",
      headerStyle: { 
        backgroundColor: Colors.primary_color,
      },
  }
}