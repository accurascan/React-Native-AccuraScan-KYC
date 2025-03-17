import { Alert, Platform } from "react-native";

export const getResultJSON = (jsonString) => {
    var json;
    try {
      // eslint-disable-next-line no-eval
      json = eval(jsonString);
    } catch (exception) {
      try {
        json = JSON.parse(jsonString);
      } catch (exception) {
        json = null;
        console.log('NOT VAID JSON');
      }
    }

    if (json) {
      console.log('VAID JSON');
      return json;
    }
    return null;
  };

export const showAlert = (title, message) => {
  if (Platform.OS === 'ios') {
    Alert.alert(title, message, [
      {
        text: 'OK',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  } else {
  //   Toast.show(message, Toast.LONG);
  }
};