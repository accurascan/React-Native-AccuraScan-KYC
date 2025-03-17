import * as React from 'react';
import AccurascanMICR from 'react-native-accurascan-micr';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  StyleSheet
} from 'react-native';

export default function OCRScreen({ route, navigation }) {

  

  const { objSDKRes: routeSDKRes, ocrContries: routeOcrContries } = route.params || {};
  if (routeSDKRes && routeOcrContries) {
    objSDKRes = routeSDKRes;
    ocrContries = routeOcrContries;
  }

  setUpCustomMessages = () => {
    var config = {
      setMinGlarePercentage: 6,
      setMaxGlarePercentage: 99,
      setBlurPercentage: 60,
      setCameraFacing: 0,
    };

    var accuraConfigs = {
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
      ACCURA_ERROR_CODE_MOTION: "Keep Document Steady",
      ACCURA_ERROR_CODE_DOCUMENT_IN_FRAME: "Keep document in frame",
      ACCURA_ERROR_CODE_PROCESSING: "Processing...",
      ACCURA_ERROR_CODE_BLUR_DOCUMENT: "Blur detect in document",
      ACCURA_ERROR_CODE_MOVE_CLOSER: "Move closer to document",
      ACCURA_ERROR_CODE_MOVE_AWAY: "Move away from document",
      ACCURA_ERROR_CODE_KEEP_MICR_IN_FRAME: "Keep MICR in frame",
    };

    var accuraTitleMsg = {
      SCAN_TITLE_MICR: 'Scan Cheque',
    };

    // Setup configuration for the native module.
    AccurascanMICR.setupAccuraConfig(
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

  const getResultJSON = (jsonString) => {
    var json;
    try {
      json = eval(jsonString);
    } catch (exception) {
      try {
        json = JSON.parse(jsonString);
      } catch (exception) {
        json = null;
        console.log('NOT VALID JSON');
      }
    }
    if (json) {
      console.log('VALID JSON');
      return json;
    }
    return null;
  };

  const getAccuraSetup = () => {
    AccurascanMICR.getMetaData((error, response) => {
      if (error != null) {
        console.log('Failure!', error);
      } else {
        setUpCustomMessages();
        console.log('JSON:- ', response);
        const res = getResultJSON(response);
        var newContries = [];

        if (res?.isMICR) {
          newContries = [...newContries, { label: 'MICR', value: 'MICR' }];
        }
        objSDKRes = res;
        ocrContries = newContries;
      }
    });
  };

  React.useEffect(() => {
    setTimeout(() => {
      getAccuraSetup();
    }, 1000);
  }, []);

  const onPressMICR = (type) => {

      let passArgs = [type];
      AccurascanMICR.startMICR(passArgs, (error, response) => {
        if (error != null) {
          console.log('Failure!', error);
        } else {
          const res = getResultJSON(response);
          navigation.navigate('Result Screen', { result: res });
        }
      });
  };

  return (
    <SafeAreaView style={styles.centerView}>
      <TouchableOpacity onPress={() => onPressMICR("e13b")}>
        <Text style={styles.centerButton}>MICR(e13b)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPressMICR("cmc7")}>
        <Text style={styles.centerButton}>MICR(cmc7)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    backgroundColor: 'grey',
    color: 'white',
    padding: 15,
    margin: 5,
    height: 50,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    overflow: 'hidden',
    width: 150,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: '#FFF',
    fontSize: 18,
  },
  optionSpacing: {
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
  },
  closeText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
