import * as React from 'react';

import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image
  } from 'react-native';


export default function ResultScreen({ route }){
    const { result } = route.params;
  
  
    if (result === undefined || result === null) {
          return;
    }
  

        var sides = ['front_data'];
        return (
          <>
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    flex: 1,
                  }}
                >
  
                  <View style={{ marginTop: -20 }}>
                    {sides.map((side, index) => {
                      return (
                        <View key={index.toString()}>
                          {result.hasOwnProperty(side) ? (
                            Object.keys(result[side]).length > 0 ? (
                              <View>
                                  <View style={styles.dataHeader}>
                                    <Text
                                      style={{ fontSize: 18, fontWeight: 'bold' }}
                                    >
                                      Cheque
                                    </Text>
                                  </View>
                                {Object.keys(result[side]).map(
                                  (key, index) => {
                                    return (
                                      <View key={index.toString()}>
                                        
                                              <View style={styles.dataItem}>
                                                <Text style={styles.lblDataTitle}>
                                                  {key}
                                                </Text>
                                                <Text style={styles.lblDataText}>
                                                  {result[side][
                                                    key
                                                  ].toString()}
                                                </Text>
                                              </View>
                                           
                                      </View>
                                    );
                                  }
                                )}
                              </View>
                            ) : (
                              <View />
                            )
                          ) : (
                            <View />
                          )}
                        </View>
                      );
                    })}
                  </View>
                  {result.hasOwnProperty('front_img') ? (
                    <View>
                      <View style={styles.dataHeader}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                          {'FRONT SIDE'}
                        </Text>
                      </View>
                      <View style={{ marginVertical: 10, borderRadius: 10 }}>
                        <Image
                          style={styles.cardImage}
                          source={{ uri: result.front_img }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View />
                  )}

                </View>
              </ScrollView>
            </View>
          </>
        );
   }

   const styles = StyleSheet.create({

    dataHeader: {
        width: '100%',
        backgroundColor: 'lightgrey',
        padding: 10,
      },
      dataItem: {
        width: '100%',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      lblDataTitle: {
        fontSize: 16,
        color: '#d22c39',
        flex: 2,
        paddingHorizontal: 5,
      },
      lblDataText: {
        fontSize: 16,
        flex: 1,
        color: '#000000',
      },
      signatureImage: {
        aspectRatio: 3 / 2,
        width: '50%',
        borderRadius: 10,
        resizeMode: 'contain',
        alignSelf: 'flex-start',
      },
      cardImage: {
        aspectRatio: 3 / 2,
        width: '100%',
        borderRadius: 10,
        resizeMode: 'contain',
        backgroundColor: 'lightgrey',
      },
      faceImageView: {
        height: 140,
        width: 100,
        borderRadius: 10,
        backgroundColor: 'lightgrey',
      },
      modelFace: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
   });