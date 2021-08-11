import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList, Pressable }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { Audio } from "expo-av"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Strings, Dimens } from "../values"
import Word from "../data/word"
import { ListItem } from "../components"

export function FamilyScreen(){

  const { container } = useTheme()
  const [sound, setSound] = useState()

  // Create a list of words
  const words = []
  words.push(new Word("father", "әpә", require("../assets/images/drawable-mdpi/family_father.png"), require("../assets/audio/family_father.mp3")))
  words.push(new Word("mother", "әṭa", require("../assets/images/drawable-mdpi/family_mother.png"), require("../assets/audio/family_mother.mp3")))
  words.push(new Word("son", "angsi", require("../assets/images/drawable-mdpi/family_son.png"), require("../assets/audio/family_son.mp3")))
  words.push(new Word("daughter", "tune", require("../assets/images/drawable-mdpi/family_daughter.png"), require("../assets/audio/family_daughter.mp3")))
  words.push(new Word("older brother", "taachi", require("../assets/images/drawable-mdpi/family_older_brother.png"), require("../assets/audio/family_older_brother.mp3")))
  words.push(new Word("younger brother", "chalitti", require("../assets/images/drawable-mdpi/family_younger_brother.png"), require("../assets/audio/family_younger_brother.mp3")))
  words.push(new Word("older sister", "teṭe", require("../assets/images/drawable-mdpi/family_older_sister.png"), require("../assets/audio/family_older_sister.mp3")))
  words.push(new Word("younger sister", "kolliti", require("../assets/images/drawable-mdpi/family_younger_sister.png"), require("../assets/audio/family_younger_sister.mp3")))
  words.push(new Word("grandmother ", "ama", require("../assets/images/drawable-mdpi/family_grandmother.png"), require("../assets/audio/family_grandmother.mp3")))
  words.push(new Word("grandfather", "paapa", require("../assets/images/drawable-mdpi/family_grandfather.png"), require("../assets/audio/family_grandfather.mp3")))

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync() }
      : undefined
  }, [sound])

  // Set a click listener to play the audio when the list item is clicked on
  const handleOnItemClick = async (position) => {
      
    // Get the {@link Word} object at the given position the user clicked on
    const word = words[position]

    // Create and setup the {@link expo-av} for the audio resource associated
    // with the current word
    const { sound } = await Audio.Sound.createAsync(word.getAudioResourceId)

    // Start the audio file
    await sound.playAsync()
  }

  return (
    <SafeAreaView style={container} edges={["bottom", "left", "right"]}>
      <View style={styles.content}>
        <FlatList 
          data={words}
          renderItem={({ item, index }) => {
            return (
              <Pressable onPress={() => handleOnItemClick(index)}>
                <ListItem item={item} style={{ backgroundColor: Colors.category_family }} onPress={handleOnItemClick}/>
              </Pressable>
            )
          }}
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