import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList, Pressable }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Audio } from "expo-av"
import { Colors, Strings, Dimens } from "../values"
import Word from "../data/word"
import { ListItem } from "../components"

export function PhrasesScreen(){

  const { container } = useTheme()
  const [soundPlayer, setSoundPlayer] = useState()

  // Create a list of words
  const words = []
  words.push(new Word("Where are you going?", "minto wuksus", undefined, require("../assets/audio/phrase_where_are_you_going.mp3")))
  words.push(new Word("What is your name?", "tinnә oyaase'nә", undefined, require("../assets/audio/phrase_what_is_your_name.mp3")))
  words.push(new Word("My name is...", "oyaaset...", undefined, require("../assets/audio/phrase_my_name_is.mp3")))
  words.push(new Word("How are you feeling?", "michәksәs?", undefined, require("../assets/audio/phrase_how_are_you_feeling.mp3")))
  words.push(new Word("I’m feeling good.", "kuchi achit", undefined, require("../assets/audio/phrase_im_feeling_good.mp3")))
  words.push(new Word("Are you coming?", "әәnәs'aa?", undefined, require("../assets/audio/phrase_are_you_coming.mp3")))
  words.push(new Word("Yes, I’m coming.", "hәә’ әәnәm", undefined, require("../assets/audio/phrase_yes_im_coming.mp3")))
  words.push(new Word("I’m coming.", "әәnәm", undefined, require("../assets/audio/phrase_im_coming.mp3")))
  words.push(new Word("Let’s go.", "yoowutis", undefined, require("../assets/audio/phrase_lets_go.mp3")))
  words.push(new Word("Come here.", "әnni'nem", undefined, require("../assets/audio/phrase_come_here.mp3")))

  useEffect(() => {
    return soundPlayer
      ? () => {
        soundPlayer.unloadAsync() }
      : undefined
  }, [soundPlayer])


  // Set a click listener to play the audio when the list item is clicked on
  const handleOnItemClick = async (position) => {

    // If the media player is not null, then it may be currently playing a sound.
    if(soundPlayer){
      // Regardless of the current state of the media player, release its resources
      // because we no longer need it.
      await soundPlayer.unloadAsync()

      // Set the media player back to null. For our code, we've decided that
      // setting the media player to null is an easy way to tell that the media player
      // is not configured to play an audio file at the moment.
      setSoundPlayer(null)
    }
      
    // Get the {@link Word} object at the given position the user clicked on
    const word = words[position]

    const sound = new Audio.Sound()
    try {
      // Create and setup the {@link expo-av} for the audio resource associated
      // with the current word
      await sound.loadAsync(word.getAudioResourceId)

      setSoundPlayer(sound)

      // Start the audio file
      await sound.playAsync()
      
      // Setup a listener on the media player, so that we can stop and release the
      // media player once the sound has finished playing.
      sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
        if(playbackStatus.didJustFinish){
          // Now that the sound file has finished playing, release the sound resources from memory.
          await sound.unloadAsync()
          setSoundPlayer(null)
        }
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={container} edges={["bottom", "left", "right"]}>
      <View style={styles.content}>
        <FlatList 
          data={words}
          renderItem={({ item, index }) => {
            return (
              <Pressable onPress={() => handleOnItemClick(index)}>
                <ListItem item={item} style={{ backgroundColor: Colors.category_phrases }} onPress={handleOnItemClick}/>
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