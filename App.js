import * as React from 'react';

/* eslint-disable react-native/no-inline-styles */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OCRScreen from './source/OCRScreen'
import CardList from './source/CardList';
import ResultScreen from './source/ResultScreen';
import BarcodeScreen from './source/BarcodeScreen';
import FirstScreen from './source/FirstScreen';
import Facematch from './source/Facematch';

const Stack = createNativeStackNavigator();

function App() {
  return ( 
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: 'Accura SDK',
          headerBackTitleVisible:false,
          headerBackButtonMenuEnabled: false,
        headerStyle: {
          backgroundColor: '#D5323F',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        }}
      >
        <Stack.Screen name="Home" component={FirstScreen} 
          options={{ headerShown:false }}/>
        <Stack.Screen name="AccuraOCR" component={OCRScreen} options={{
          title : 'Accura KYC',
        }} />
        <Stack.Screen name="Card List" component={CardList} options={{
          title : 'Card List',
        }}/>
        <Stack.Screen name="Result Screen" component={ResultScreen} options={{
          title : 'Result',
        }}/>
        <Stack.Screen name="Barcode List" component={BarcodeScreen} options={{
          title : 'Barcode List',
        }}/>
        <Stack.Screen name="Facematch Screen" component={Facematch} options={{
          title : 'Facematch',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>  );
}

export default App;
