import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import { primaryGradientArray } from './utils/Colors';
import Header from './components/Header';
import Input from './components/Input';
import Contacts from 'react-native-contacts';



const headerTitle = "Get Out Your Friends' Vote";

const currentPlatform = Platform.OS //either ios or android


//Example contact {
// recordID: 1,
//   familyName: "Jung",
//     givenName: "Carl",
//       middleName: "",
//         emailAddresses: [{
//           label: "work",
//           email: "carl-jung@example.com",
//         }],
//           phoneNumbers: [{
//             label: "mobile",
//             number: "(555) 555-5555",
//           }],
//             thumbnailPath: "",
// }
//We are adding a message sent key

let contactList

export default class Main extends React.Component {
  state = {
    textMessage: "Hey don't forget to vote, learn more at: ",
    contactList: {},
    loadingItems: false
  }

  componentDidMount () {
    this.loadingItems();
  }

  loadingItems =  async () => {
    //Checking if contacts already loaded into AsyncStorage
    try {
      contactList = await AsyncStorage.getItem('contactList')
      if (contactList != null){
        contactList = JSON.parse(contactList)
      } else {
        contactList = async function () {
          if (currentPlatform === 'ios') {
            await Contacts.getAll((err, contacts) => {
              if (err) {
                throw err;
                //We need to print on the screen you need to give this app persomission to view your contacts Settings > GOFV > contacts
              } else { return contacts }
            })
          } else {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
              {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.'
              }
            ).then(async () => {
              await Contacts.getAll((err, contacts) => {
                if (err === 'denied') {
                  console.log('You denied access to your contacts')
                } else if (err) {
                  console.log(err)
                } else {
                  return contacts
                }
              })
            })
          }
        }
        contactList.forEach(contact => {
          if (!contact.messageSent) {
            contact.messageSent = ''
          }
          return contact
        })
        AsyncStorage.setItem('contactList', JSON.stringify(contactList))
      }
    } catch (err) {
      console.error(err)
    }

    this.setState ({
      loadingItems: true,
      contactList: contactList || {}
    })
  }

  //Adding the sent message to your contact list
  //input is the id of the contact
  onDoneSendMessage = (id) => {
    const { textMessage } = this.state;
    if (textMessage !== ''){
      this.setState(prevState => {
        const contactWithMessage = {
          [id]: {
            ...prevState.contactList[id],
            messageSent: prevState.textMessage
          }
        }
        const newState = {
          ...prevState,
          textMessage: "Hey don't forget to vote, learn more at: ",
          contactList: {
            ...prevState.contactList,
            [id]: {...contactWithMessage}
          }
        }
        this.saveContacts(newState.contactList)
        return {...newState}
      })
    }
  }

  //You need to make an async storage for this app!
  saveItems = newItem => {
    const saveItem = AsyncStorage.setItem('Contact List', JSON.stringify(newItem))
  }

  newTextMessage = value => {
    this.setState ({
      textMessage: value
    });
  };

  render() {
    const {textMessage, loadingItems, contactList} = this.state

    return (
      <LinearGradient colors={primaryGradientArray} style={styles.container}>
        <StatusBar barStyle="light-content" />;
        <View style={styles.centered}>
          <Header title={headerTitle} />
        </View>;
        <View style={styles.inputContainer}>
          <Input textMessage={textMessage} onChangeText={this.newTextMessage} onDoneSendMessage={this.onDoneSendMessage} />
        </View>
        <View style={styles.list}>
          {loadingItems ? (
            <ScrollView contentContainerStyle={styles.scrollableList}>
              {Object.values(contactList)
                .reverse()
                .map(item => (
                  <List
                    key={item.id}
                    {...item}
                  // deleteItem={this.deleteItem}
                  // completeItem={this.completeItem}
                  // incompleteItem={this.incompleteItem}
                  />
                ))}
            </ScrollView>
          ) : (
              <ActivityIndicator size="large" color="white" />
            )}
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
  },
  list: {
    flex: 1,
    marginTop: 70,
    paddingLeft: 15,
    marginBottom: 10
  },
  scrollableList: {
    marginTop: 15
  },
});
