import React, { useEffect, useState } from "react"
import { View, FlatList }  from "react-native"
import { Audio } from "expo-av"
import { Colors, Dimens } from "../values"
import Word from "../data/word"
import { ListItem } from "../components"

export function NumbersScreen({ containerStyle }){

  const [soundPlayer, setSoundPlayer] = useState()

  const words = []
  words.push(new Word("one", "lutti", require("../assets/images/drawable-mdpi/number_one.png"), require("../assets/audio/number_one.mp3")))
  words.push(new Word("two", "otiiko", require("../assets/images/drawable-mdpi/number_two.png"), require("../assets/audio/number_two.mp3")))
  words.push(new Word("three", "tolookosu", require("../assets/images/drawable-mdpi/number_three.png"), require("../assets/audio/number_three.mp3")))
  words.push(new Word("four", "oyyisa", require("../assets/images/drawable-mdpi/number_four.png"), require("../assets/audio/number_four.mp3")))
  words.push(new Word("five", "massokka", require("../assets/images/drawable-mdpi/number_five.png"), require("../assets/audio/number_five.mp3")))
  words.push(new Word("six", "temmokka", require("../assets/images/drawable-mdpi/number_six.png"), require("../assets/audio/number_six.mp3")))
  words.push(new Word("seven", "kenekaku", require("../assets/images/drawable-mdpi/number_seven.png"), require("../assets/audio/number_seven.mp3")))
  words.push(new Word("eight", "kawinta", require("../assets/images/drawable-mdpi/number_eight.png"), require("../assets/audio/number_eight.mp3")))
  words.push(new Word("nine", "wo’e", require("../assets/images/drawable-mdpi/number_nine.png"), require("../assets/audio/number_nine.mp3")))
  words.push(new Word("ten", "na’aacha", require("../assets/images/drawable-mdpi/number_ten.png"), require("../assets/audio/number_ten.mp3")))

  useEffect(() => {
    return soundPlayer
      ? () => {
        soundPlayer.unloadAsync() }
      : undefined;
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
      <View style={containerStyle}>
        <FlatList 
          data={words}
          renderItem={({ item, index }) => <ListItem index={index} item={item} style={{ backgroundColor: Colors.category_numbers }} onPress={handleOnItemClick}/>}
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
