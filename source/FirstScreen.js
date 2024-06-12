import * as React from 'react';

import AccurascanKyc from 'accurascan_kyc';
import {getResultJSON} from './utils/utility';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Dimensions,
  } from 'react-native';

  const windowWidth = Dimensions.get('window').width;

export default function FirstScreen({ navigation }){
    var objSDKRes;
    var ocrContries = [];
    var barcodeTypes = [];
    var flipImage;
    const [isLoading, setisLoading] = React.useState(true);
  
    getAccuraSetup = () => {
      //Method for get license info from native OS.
      AccurascanKyc.getMetaData((error, response) => {
        if (error != null) {
          console.log('Failure!', error);
           isLoading = false
        } else {
          setUpCustomMessages();
          console.log('JSON:- ', response);
          const res = getResultJSON(response);
          var newContries = [];
          var a = 0;
    
          if (res?.isMRZ) {
            newContries = [
              ...newContries,
              { label: 'Passport', value: 'passport_mrz' },
              { label: 'Mrz ID', value: 'id_mrz' },
              { label: 'Visa Card', value: 'visa_card' },
              { label: 'Other', value: 'other_mrz' },
            ];
          }
    
          if (res?.isBarcode) {
            newContries = [
              ...newContries,
              { label: 'Barcode', value: 'Barcode' },
            ];
          }
    
          if (res?.isBankCard) {
            newContries = [
              ...newContries,
              { label: 'BankCard', value: 'BankCard' },
            ];
          }
    
          res?.countries?.map(
            (item) =>
              (newContries = [...newContries, { label: item.name, value: a++ }])
          );
  
          var newBarcodeTypes = [];
          res?.barcodes?.map(
            (item) =>
              (newBarcodeTypes = [
                ...newBarcodeTypes,
                { label: item.name, value: item.type },
              ])
          );
            objSDKRes = res,
            ocrContries = newContries;
            barcodeTypes = newBarcodeTypes;
            setisLoading(false);
        }
      });
    };
  
    setUpCustomMessages = () => {
      var config = {
        setFaceBlurPercentage: 80,
        setHologramDetection: true,
        setLowLightTolerance: 10,
        setMotionThreshold: 25,
        setMinGlarePercentage: 6,
        setMaxGlarePercentage: 99,
        setBlurPercentage: 60,
        setCameraFacing: 0,
      };
  
      var accuraConfigs = {
        flipImage: flipImage,
        CameraScreen_CornerBorder_Enable: true,
        CameraScreen_Border_Width: 15,
        Disable_Card_Name: false,
        enableLogs: 0,
        setCameraFacing: 0,
        isShowLogo: 1,
        isFlipImg: 1,
        CameraScreen_Frame_Color: '#D5323F',
        CameraScreen_Text_Color: '#FFFFFF',
        CameraScreen_Text_Border_Color: '#000000',
        CameraScreen_Color: '#80000000',
        CameraScreen_Back_Button: 1,
        CameraScreen_Change_Button: 1,
        ACCURA_ERROR_CODE_MOTION: 'Keep Document Steady',
        ACCURA_ERROR_CODE_DOCUMENT_IN_FRAME: 'Keep document in frame',
        ACCURA_ERROR_CODE_BRING_DOCUMENT_IN_FRAME: 'Bring card near to frame',
        ACCURA_ERROR_CODE_PROCESSING: 'Processing...',
        ACCURA_ERROR_CODE_BLUR_DOCUMENT: 'Blur detect in document',
        ACCURA_ERROR_CODE_FACE_BLUR: 'Blur detected over face',
        ACCURA_ERROR_CODE_GLARE_DOCUMENT: 'Glare detect in document',
        ACCURA_ERROR_CODE_HOLOGRAM: 'Hologram Detected',
        ACCURA_ERROR_CODE_DARK_DOCUMENT: 'Low lighting detected',
        ACCURA_ERROR_CODE_PHOTO_COPY_DOCUMENT:
          'Can not accept Photo Copy Document',
        ACCURA_ERROR_CODE_FACE: 'Face not detected',
        ACCURA_ERROR_CODE_MRZ: 'MRZ not detected',
        ACCURA_ERROR_CODE_PASSPORT_MRZ: 'Passport MRZ not detected',
        ACCURA_ERROR_CODE_ID_MRZ: 'ID MRZ not detected',
        ACCURA_ERROR_CODE_VISA_MRZ: 'Visa MRZ not detected',
        ACCURA_ERROR_CODE_UPSIDE_DOWN_SIDE:
          'Document is upside down. Place it properly',
        ACCURA_ERROR_CODE_WRONG_SIDE: 'Scanning wrong side of Document',
      };
  
      var accuraTitleMsg = {
        SCAN_TITLE_OCR_FRONT: 'Scan Front side of ',
        SCAN_TITLE_OCR_BACK: 'Scan Back side of ',
        SCAN_TITLE_OCR: 'Scan ',
        SCAN_TITLE_MRZ_PDF417_FRONT: 'Scan Front Side of Document',
        SCAN_TITLE_MRZ_PDF417_BACK: 'Scan Back Side of Document',
        SCAN_TITLE_DLPLATE: 'Scan Number plate',
        SCAN_TITLE_BARCODE: 'Scan Barcode',
        SCAN_TITLE_BANKCARD: 'Scan BankCard',
      };
  
      //Method for setup config into native OS.
      AccurascanKyc.setupAccuraConfig(
        [config, accuraConfigs, accuraTitleMsg],
        (error, response) => {
          if (error != null) {
            console.log('Failure!', error);
          } else {
            console.log('Message:- ', response);
          }
        }
      );
    };
  
    React.useEffect(() => {
      const imageSource = require('../assets/images/flip.png');
      flipImage = Image.resolveAssetSource(imageSource).uri;
      console.log('Image path:', flipImage);
      setTimeout(function() {
        getAccuraSetup();
      }, 1000);
    });
  
    return(
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.backgroundView}
      >
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#d32d38" />
          </View>
        ) : (
          <>
            {
              <SafeAreaView>
                <View style={styles.container}>
                  <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logoView}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AccuraOCR',{
                      objSDKRes: objSDKRes,
                      ocrContries: ocrContries,
                      barcodeTypes: barcodeTypes
                    })}
                  >
                    <Image
                      source={require('../assets/images/OCR.jpg')}
                      style={styles.FirstView}
                    />
                  </TouchableOpacity>
                     <TouchableOpacity
                      onPress={() => navigation.navigate('Facematch Screen')}>
                      <Image
                        source={require('../assets/images/Facematch.jpg')}
                        style={styles.FirstView}
                      />
                    </TouchableOpacity> 
                </View>
              </SafeAreaView>
            }
          </>
        )}
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 30,
      // flex: 1,
      marginHorizontal: 20,
      marginVertical: 10,
      alignItems: 'center',
    },
    backgroundView: {
      flex: 1,
    },
    logoView: {
      width: 180,
      height: 90,
      resizeMode: 'stretch',
    },
    FirstView: {
      width: windowWidth - 20,
      height: 200,
      marginTop: 30,
      resizeMode: 'stretch',
      alignContent: 'center',
    },
  });