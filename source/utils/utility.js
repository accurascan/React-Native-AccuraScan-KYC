import { Alert, Platform } from "react-native";
import RNFS from 'react-native-fs';

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



  export const downloadFile = async (url) => {
    try {
      const fileName = url.split('/').pop(); // Get the file name from the URL
      const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
      // Check if the file already exists
      const fileExists = await RNFS.exists(destinationPath);
      
      if (fileExists) {
        console.log('File already exists at:', /*destinationPath*/);
        return destinationPath;
      }
  
      // If file doesn't exist, download it
      const downloadResult = await RNFS.downloadFile({
        fromUrl: url,
        toFile: destinationPath,
      }).promise;
  
      if (downloadResult.statusCode === 200) {
        console.log('File downloaded to:', destinationPath);
        return destinationPath;
      } else {
        console.error('Failed to download file', downloadResult);
        throw new Error('Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file', error);
      throw error;
    }
  };
  