import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList, Pressable }  from "react-native"
import { useTheme } from "@react-navigation/native"
import { Audio } from "expo-av"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors, Dimens, Strings } from "../values"
import Word from "../data/word"
import { ListItem } from "../components"

export function NumbersScreen(){

  const { container } = useTheme()
  const [sound, setSound] = useState()

  const words = []
  words.push(new Word("one", "lutti", require("../assets/images/drawable-mdpi/number_one.png")))
  words.push(new Word("two", "otiiko", require("../assets/images/drawable-mdpi/number_two.png")))
  words.push(new Word("three", "tolookosu", require("../assets/images/drawable-mdpi/number_three.png")))
  words.push(new Word("four", "oyyisa", require("../assets/images/drawable-mdpi/number_four.png")))
  words.push(new Word("five", "massokka", require("../assets/images/drawable-mdpi/number_five.png")))
  words.push(new Word("six", "temmokka", require("../assets/images/drawable-mdpi/number_six.png")))
  words.push(new Word("seven", "kenekaku", require("../assets/images/drawable-mdpi/number_seven.png")))
  words.push(new Word("eight", "kawinta", require("../assets/images/drawable-mdpi/number_eight.png")))
  words.push(new Word("nine", "wo’e", require("../assets/images/drawable-mdpi/number_nine.png")))
  words.push(new Word("ten", "na’aacha", require("../assets/images/drawable-mdpi/number_ten.png")))

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync() }
      : undefined;
  }, [sound])

  const handleOnItemClick = async () => {
    const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/number_one.mp3")
    )
    await sound.playAsync()
  }
  return (
    <SafeAreaView style={container} edges={["bottom", "left", "right"]}>
      <View style={styles.content}>
        <FlatList 
          data={words}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={handleOnItemClick}>
                <ListItem item={item} style={{ backgroundColor: Colors.category_numbers }} onPress={handleOnItemClick}/>
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