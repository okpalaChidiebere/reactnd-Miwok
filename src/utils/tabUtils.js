import React from "react"
import { StyleSheet, Dimensions } from "react-native"
import { NumbersScreen, FamilyScreen, ColorsScreen, PhrasesScreen } from "../screens"
import { Strings } from "../values"

const { width, height } = Dimensions.get("window")


export default [ 
    {
      key: Strings.category_numbers,
      getFragment(key){
        return <NumbersScreen key={key} containerStyle={styles.page}/>
      }
    },
    {
      key: "Family",
      getFragment(key){
        return <FamilyScreen key={key} containerStyle={styles.page}/>
      }
    },
    {
      key: Strings.category_colors,
      getFragment(key){
        return <ColorsScreen key={key} containerStyle={styles.page}/>
      }
    },
    {
      key: Strings.category_phrases,
      getFragment(key){
        return <PhrasesScreen key={key} containerStyle={styles.page}/>
      }
    },
]

const styles = StyleSheet.create({
    page: {
      width, 
      height,
    }
  })