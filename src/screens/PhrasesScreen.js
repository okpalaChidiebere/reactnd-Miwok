import React from "react"
import { View, StyleSheet, FlatList }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings, Dimens } from "../values"
import Word from "../data/word"
import { ListItem } from "../components"

export function PhrasesScreen(){

  const { container } = useTheme()

  // Create a list of words
  const words = []
  words.push(new Word("Where are you going?", "minto wuksus"))
  words.push(new Word("What is your name?", "tinnә oyaase'nә"))
  words.push(new Word("My name is...", "oyaaset..."))
  words.push(new Word("How are you feeling?", "michәksәs?"))
  words.push(new Word("I’m feeling good.", "kuchi achit"))
  words.push(new Word("Are you coming?", "әәnәs'aa?"))
  words.push(new Word("Yes, I’m coming.", "hәә’ әәnәm"))
  words.push(new Word("I’m coming.", "әәnәm"))
  words.push(new Word("Let’s go.", "yoowutis"))
  words.push(new Word("Come here.", "әnni'nem"))

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

export function PhrasesScreenOptions(){
  return {
      title: Strings.category_ph,
      headerTintColor: Colors.white,
      headerBackTitleVisible: false,
      headerMode: "screen",
      headerStyle: { 
        backgroundColor: Colors.primary_color,
      },
  }
}