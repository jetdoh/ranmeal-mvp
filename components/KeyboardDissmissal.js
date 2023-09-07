import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { Key } from 'react-native-feather'

const KeyboardDissmissal = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} accessible = {false}>
        {children}
    </TouchableWithoutFeedback>
  )
}

export default KeyboardDissmissal