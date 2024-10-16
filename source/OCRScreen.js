import * as React from 'react';

import AccurascanKyc from 'accurascan_kyc';
import {getResultJSON} from './utils/utility';

import {
    Text,
    View,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet
  } from 'react-native';


export default function OCRScreen({ route, navigation }) {
    var mrzSelected;
    var countrySelected;
    var cardSelected;
  
    const { objSDKRes, ocrContries, barcodeTypes} = route.params;
  
    onPressBankcard = () => {
      AccurascanKyc.startBankCard((error, response) => {
        if (error != null) {
          console.log('Failure!', error);
        } else {
          const res = getResultJSON(response);
          navigation.navigate('Result Screen',{
            result: res,
          })
        }
      });
    };
  
    onPressMRZ = () => {
      var isValid = true;
      if (mrzSelected === '' || mrzSelected === null) {
        isValid = false;
      }
  
      if (isValid) {
        let passArgs = [mrzSelected];
        //Method for start MRZ scaning from native OS.
        AccurascanKyc.startMRZ(passArgs, (error, response) => {
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
    };

        return (
          <ImageBackground
            source={require('../assets/images/background.png')}
            style={styles.backgroundView}
          >
            <>
              <SafeAreaView>
                <View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                      {ocrContries.map((Country) => {
                        return (
                          <View 
                          key={Country.label}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                console.log('country selected', Country.value);
                                if (
                                  Country.label === 'Passport' ||
                                  Country.label === 'Mrz ID' ||
                                  Country.label === 'Visa Card' ||
                                  Country.label === 'Other'
                                ) {
                                  mrzSelected = Country.value;
                                  onPressMRZ();
                                } else if (Country.label === 'Barcode') {
                                  navigation.navigate('Barcode List',{
                                    barcodeTypes: barcodeTypes,
                                  })
                                } else if (Country.label === 'BankCard') {
                                  onPressBankcard();
                                } else {
                                  countrySelected =
                                    objSDKRes?.countries[
                                      Country.value
                                    ];
                                  cardSelected = countrySelected.cards;
                                
                                  navigation.navigate('Card List',{
                                    countrySelected: countrySelected,
                                    cardSelected: cardSelected,
                                  })
                                }
                              }}
                            >
                              {
                              Country.label === 'Passport' ||
                              Country.label === 'Mrz ID' ||
                              Country.label === 'Visa Card' ||
                              Country.label === 'Other' ||
                              Country.label === 'Barcode' ||
                              Country.label === 'BankCard' 
                              ? (
                                <Text style={[styles.btn, { backgroundColor: 'grey'}]}>
                                  {Country.label}
                                </Text>
                              ) : (
                                <Text style={[styles.btn, { backgroundColor: '#D5323F'}]}>
                                  {Country.label}
                                </Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </SafeAreaView>
            </>
          </ImageBackground>
        );
   }

const styles = StyleSheet.create({
    backgroundView: {
        flex: 1,
      }, 
      btn: {
        flex: 1,
        color: 'white',
        padding: 15,
        margin: 5,
        height: 50,
        textAlign: 'left',
        borderRadius: 10,
        fontWeight: 'bold',
        overflow: 'hidden',
      }
});