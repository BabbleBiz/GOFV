import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import { primaryGradientArray } from './utils/Colors';
import Header from './components/Header';
import Input from './components/Input';

const headerTitle = "Get Out Your Friends' Vote";

export default class Main extends React.Component {
  state = {
    textMessage: "Hey don't forget to vote, learn more at: "
  }

  newTextMessage = value => {
    this.setState ({
      textMessage: value
    });
  };

  render() {
    const {textMessage} = this.state

    return (
      <LinearGradient colors={primaryGradientArray} style={styles.container}>
        <StatusBar barStyle="light-content" />;
        <View style={styles.centered}>
          <Header title={headerTitle} />
        </View>;
        <View style={styles.inputContainer}>
          <Input textMessage={textMessage} onChangeText={this.newTextMessage} />
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: 40,
    paddingLeft: 15
  }
});
