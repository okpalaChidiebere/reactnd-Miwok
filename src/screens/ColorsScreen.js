import React, { useEffect, useState } from "react"
import { View, FlatList }  from "react-native"
import { Audio } from "expo-av"
import { Colors, Dimens } from "../values"
import Word from "../data/word"
import { ListItem } from "../components"

export function ColorsScreen(){

  const [soundPlayer, setSoundPlayer] = useState()

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
      <View>
        <FlatList 
          data={words}
          renderItem={({ item, index }) => <ListItem index={index} item={item} style={{ backgroundColor: Colors.category_colors }} onPress={handleOnItemClick}/>}
          getItemLayout={(_, index) => ({
            length: Dimens.list_item_height + Dimens.word_list_item_separator_height, 
            offset: Dimens.list_item_height + Dimens.word_list_item_separator_height * index,
            index,
          })}
          keyExtractor={item => item.getDefaultTranslation}
          ItemSeparatorComponent={ () => <View style={{height:Dimens.word_list_item_separator_height, backgroundColor: Colors.colorDivider, marginLeft:8, marginRight:8}}/> }
        />
      </View>
  )
}
