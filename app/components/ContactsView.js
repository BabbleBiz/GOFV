import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  itemListText,
  itemListTextStrike,
  circleInactive,
  circleActive,
  deleteIconColor
} from '../utils/Colors';

const { height, width } = Dimensions.get('window');

//Things to consider:
//complete/not complete is probably fine
//Do we need delete? Probs not
//Need text to show up at the top, probs don't need to import text
class ContactsView extends Component {
  onToggleCircle = () => {
    const { isCompleted, id, completeItem, incompleteItem } = this.props;
    if (isCompleted) {
      incompleteItem(id);
    } else {
      completeItem(id);
    }
  };
  render() {
    const { deleteItem, recordID, familyName, givenName, isCompleted, messageSent } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.onToggleCircle}>
            <View
              style={[
                styles.circle,
                isCompleted
                  ? { borderColor: circleActive }
                  : { borderColor: circleInactive }
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              isCompleted
                ? {
                  color: itemListTextStrike,
                  textDecorationLine: 'line-through'
                }
                : { color: itemListText }
            ]}
          >
            {`${givenName} ${familyName}`}
            {messageSent === '' ? '' : `  Sent Message`}
          </Text>
        </View>
        {isCompleted ? (
          <View style={styles.button}>
            <TouchableOpacity onPressOut={() => deleteItem(id)}>
              <MaterialIcons
                name="delete-forever"
                size={24}
                color={deleteIconColor}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width - 50,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    height: width / 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 1.5
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 15
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    margin: 10
  },
  button: {
    marginRight: 10
  }
});
export default ContactsView;
