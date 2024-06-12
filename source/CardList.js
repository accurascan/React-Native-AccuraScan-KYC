import * as React from 'react';

import AccurascanKyc from 'accurascan_kyc';
import {getResultJSON} from './utils/utility';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';

export default function CardList({ route, navigation }) {

    const { countrySelected, cardSelected} = route.params;
    onPressOCR = () => {
    var isValid = true;
    if (countrySelected === null || countrySelected === '') {
      isValid = false;
    }

    if (cardSelected === null || cardSelected === '') {
      isValid = false;
    }

    if (isValid) {
      let passArgs = [
        countrySelected.id,
        cardSelected.id,
        cardSelected.name,
        cardSelected.type,
      ]; 

      AccurascanKyc.startOcrWithCard(passArgs, (error, response) => {
        if (error != null) {
          console.log('Failure!', error);
        } else {
          const res = getResultJSON(response);
          // result = res;
          navigation.navigate('Result Screen',{
            result: res,
    })
        }
      });
    }
    };

    return (
      <>
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <View
              style={{ flex: 1, padding: 20, backgroundColor: '#ffffff' }}
            > */}
            {cardSelected.map((Cards) => {
              return (
                <View
                key={Cards.name}
                  style={{
                    backgroundColor: '#ffffff',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      cardSelected.id = Cards.id;
                      cardSelected.name = Cards.name;
                      cardSelected.type = Cards.type;
                      onPressOCR();
                    }}
                  >
                    <Text style={styles.btn}>
                      {Cards.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            {/* </View> */}
          </ScrollView>
        </View>
      </>
    );
   }

   const styles = StyleSheet.create({
   
      btn: {
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
      }
});