import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList, Pressable }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Audio } from "expo-av"
import { Colors, Strings, Dimens } from "../values"
import Word from "../data/word"
import { ListItem } from "../components"

export function ColorsScreen(){

  const { container } = useTheme()
  const [sound, setSound] = useState()

  // Create a list of words
  const words = []
  words.push(new Word("red", "weṭeṭṭi", require("../assets/images/drawable-mdpi/color_red.png"), require("../assets/audio/color_red.mp3")))
  words.push(new Word("mustard yellow", "chiwiiṭә", require("../assets/images/drawable-mdpi/color_mustard_yellow.png"), require("../assets/audio/color_mustard_yellow.mp3")))
  words.push(new Word("dusty yellow", "ṭopiisә", require("../assets/images/drawable-mdpi/color_dusty_yellow.png"), require("../assets/audio/color_dusty_yellow.mp3")))
  words.push(new Word("green", "chokokki", require("../assets/images/drawable-mdpi/color_green.png"), require("../assets/audio/color_green.mp3")))
  words.push(new Word("brown", "ṭakaakki", require("../assets/images/drawable-mdpi/color_brown.png"), require("../assets/audio/color_brown.mp3")))
  words.push(new Word("gray", "ṭopoppi", require("../assets/images/drawable-mdpi/color_gray.png"), require("../assets/audio/color_gray.mp3")))
  words.push(new Word("black", "kululli", require("../assets/images/drawable-mdpi/color_black.png"), require("../assets/audio/color_black.mp3")))
  words.push(new Word("white", "kelelli", require("../assets/images/drawable-mdpi/color_white.png"), require("../assets/audio/color_white.mp3")))

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
                <ListItem item={item} style={{ backgroundColor: Colors.category_colors }} onPress={handleOnItemClick}/>
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