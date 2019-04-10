import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { inputPlaceholder } from '../utils/Colors';

const Input = ({ textMessage, onChangeText, onDoneSendMessage }) => (
  <TextInput
    style={styles.input}
    value={textMessage}
    onChangeText={onChangeText}
    multiline={true}
    autoCapitalize="sentences"
    underlineColorAndroid="transparent"
    selectionColor={'white'}
    maxLength={30}
    returnKeyType="done"
    autoCorrect={false}
    blurOnSubmit={true}
    onSubmitEditing={onDoneSendMessage}
  />
);
const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 34,
    color: 'white',
    fontWeight: '500'
  }
});
export default Input;
