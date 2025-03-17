import * as React from 'react';

/* eslint-disable react-native/no-inline-styles */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OCRScreen from './source/OCRScreen'
import ResultScreen from './source/ResultScreen';


const Stack = createNativeStackNavigator();

function App() {
  return ( 
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: 'Accura SDK',
          headerBackTitleVisible:false,
        headerStyle: {
          backgroundColor: '#D5323F',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        }}
      >
        <Stack.Screen name="Home" component={OCRScreen} 
          options={{ headerShown:false }}/>
        <Stack.Screen name="Result Screen" component={ResultScreen} options={{
          title : 'Result',
        }}/>

      </Stack.Navigator>
    </NavigationContainer>  );
}

export default App;
