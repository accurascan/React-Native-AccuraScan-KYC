import * as React from 'react';

import AccurascanKyc from 'accurascan_kyc';
import {getResultJSON} from './utils/utility'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';


export default function BarcodeScreen({ route, navigation }){
    const { barcodeTypes } = route.params;
  
    var barcodeSelected;
  
      onPressBarcode = () => {
      var isValid = true;
      if (barcodeSelected?.toString() === '') {
        isValid = false;
      }
  
      if (isValid) {
        let passArgs = [barcodeSelected];
        //Method for start MRZ scaning from native OS.
        AccurascanKyc.startBarcode(passArgs, (error, response) => {
          if (error != null) {
            console.log('Failure!', error);
          } else {
            const res = getResultJSON(response);
            navigation.navigate('Result Screen',{
              result: res,
            })
          }
        });
      }
    }
  
          return (
          <>
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {barcodeTypes.map((Cards) => {
                  return (
                    <View key={Cards.label}>
                      <TouchableOpacity
                        onPress={() => {
                          console.log(Cards);
                          barcodeSelected = Cards.value;
                          onPressBarcode();
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontWeight: 'bold',
                            borderRadius: 10,
                            color: 'white',
                            backgroundColor: '#D5323F',
                            padding: 15,
                            margin: 5,
                            height: 50,
                            textAlign: 'left',
                            overflow: 'hidden',
                          }}
                        >
                          {Cards.label}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </>
        );
   }