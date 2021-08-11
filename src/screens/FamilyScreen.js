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
  words.push(new Word("father", "әpә", require("../assets/images/drawable-mdpi/family_father.png")))
  words.push(new Word("mother", "әṭa", require("../assets/images/drawable-mdpi/family_mother.png")))
  words.push(new Word("son", "angsi", require("../assets/images/drawable-mdpi/family_son.png")))
  words.push(new Word("daughter", "tune", require("../assets/images/drawable-mdpi/family_daughter.png")))
  words.push(new Word("older brother", "taachi", require("../assets/images/drawable-mdpi/family_older_brother.png")))
  words.push(new Word("younger brother", "chalitti", require("../assets/images/drawable-mdpi/family_younger_brother.png")))
  words.push(new Word("older sister", "teṭe", require("../assets/images/drawable-mdpi/family_older_sister.png")))
  words.push(new Word("younger sister", "kolliti", require("../assets/images/drawable-mdpi/family_younger_sister.png")))
  words.push(new Word("grandmother ", "ama", require("../assets/images/drawable-mdpi/family_grandmother.png")))
  words.push(new Word("grandfather", "paapa", require("../assets/images/drawable-mdpi/family_grandfather.png")))

  

  return (
    <SafeAreaView style={container} edges={["bottom", "left", "right"]}>
      <View style={styles.content}>
        <FlatList 
          data={words}
          renderItem={({ item }) => <ListItem item={item} style={{ backgroundColor: Colors.category_family }}/>}
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