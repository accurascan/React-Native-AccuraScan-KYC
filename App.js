/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {AppBar} from '@react-native-material/core';

import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Dimensions,
  Platform,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  LogBox,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import AccurascanKyc from 'accurascan_kyc';

const windowWidth = Dimensions.get('window').width;

export default class App extends React.Component {
  mrzSelected = '';
  mrzCountryList = 'all';
  countrySelected = null;
  cardSelected = null;
  barcodeSelected = '';
  result = null;
  facematchURI = '';
  newIndex = 0;
  flipImage = '';

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      isValid: false,
      isGetToken: false,
      objSDKRes: [],
      ocrContries: [],
      ocrCards: [],

      barcodeTypes: [],
      objScanRes: [],
      ocrCardName: '',
      cardList: [],

      isMainScreen: true,
      isOCRScreen: false,
      isCardListScreen: false,
      isResultScreen: false,
      isFacematchScreen: false,
      isBarcodeScreen: false,

      secondImageURI: '',
      fm_score: 0.0,
      lv_score: 0.0,

      SecondFMImageURI: '',
      FirstFMImageURI: '',

      isValidCountry: true,
      isValidCard: true,
      isValidType: true,
      isValidBarcodeType: true,
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const imageSource = require('./assets/images/background.png');
    this.flipImage = Image.resolveAssetSource(imageSource).uri;
    console.log('Image path:', this.flipImage);
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    LogBox.ignoreAllLogs();
    console.log('IS_ACTIVE_ACCURA_KYC:- ', AccurascanKyc.getConstants());
    this.setUpCustomMessages();
    this.getAccuraSetup();
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  //Code for setup message & config into document scanning window.
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
      flipImage: this.flipImage,
      enableLogs: 1,
      setCameraFacing: 0,
      isShowLogo: 1,
      isFlipImg: 1,
      CameraScreen_CornerBorder_Enable: false,
      CameraScreen_Border_Width: 15,
      Disable_Card_Name: false,
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
          console.log('Failur!', error);
        } else {
          console.log('Message:- ', response);
        }
      },
    );
  };

  //Code for get license info.
  getAccuraSetup = () => {
    //Method for get license info from native OS.
    AccurascanKyc.getMetaData((error, response) => {
      if (error != null) {
        console.log('Failur!', error);
        this.setState({isLoading: false});
      } else {
        console.log('JSON:- ', response);
        const res = this.getResultJSON(response);
        var newContries = [];
        var a = 0;

        if (res?.isMRZ) {
          newContries = [
            ...newContries,
            {label: 'Passport', value: 'passport_mrz'},
            {label: 'Mrz ID', value: 'id_mrz'},
            {label: 'Visa Card', value: 'visa_card'},
            {label: 'Other', value: 'other_mrz'},
          ];
        }

        if (res?.isBarcode) {
          newContries = [...newContries, {label: 'Barcode', value: 'Barcode'}];
        }

        if (res?.isBankCard) {
          newContries = [
            ...newContries,
            {label: 'BankCard', value: 'BankCard'},
          ];
        }

        res?.countries?.map(
          item =>
            (newContries = [...newContries, {label: item.name, value: a++}]),
        );

        var newBarcodeTypes = [];
        res?.barcodes?.map(
          item =>
            (newBarcodeTypes = [
              ...newBarcodeTypes,
              {label: item.name, value: item.type},
            ]),
        );
        this.setState({
          objSDKRes: res,
          ocrContries: newContries,
          isValid: res.isValid,
          barcodeTypes: newBarcodeTypes,
          isLoading: false,
        });
      }
    });
  };

  showAlert = (title, message) => {
    if (Platform.OS === 'ios') {
      Alert.alert(title, message, [
        {
          text: 'OK',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    } else {
      // Toast.show(message, Toast.LONG);
    }
  };

  onPressBankcard = () => {
    AccurascanKyc.startBankCard((error, response) => {
      if (error != null) {
        console.log('Failure!', error);
        this.showAlert('Failure!', error);
      } else {
        const res = this.getResultJSON(response);
        this.result = res;
        this.setState({
          isResultScreen: true,
          isMainScreen: false,
          isOCRScreen: false,
          isCardListScreen: false,
          isFacematchScreen: false,
          isBarcodeScreen: false,
          objScanRes: res,
        });
      }
    });
  };

  onPressOCR = () => {
    var isValid = true;
    if (this.countrySelected === null || this.countrySelected === '') {
      this.setState({isValidCountry: false});
      isValid = false;
    }

    if (this.cardSelected === null || this.cardSelected === '') {
      this.setState({isValidCard: false});
      isValid = false;
    }

    if (isValid) {
      let passArgs = [
        this.countrySelected.id,
        this.cardSelected.id,
        this.cardSelected.name,
        this.cardSelected.type,
      ]; //[{"enableLogs":false},1,41,"Emirates National ID",0,"portrait-primary"]
      //Method for start OCR scaning from native OS.
      AccurascanKyc.startOcrWithCard(passArgs, (error, response) => {
        if (error != null) {
          console.log('Failure!', error);
          this.showAlert('Failure!', error);
        } else {
          const res = this.getResultJSON(response);
          this.result = res;
          this.setState({
            isResultScreen: true,
            isMainScreen: false,
            isOCRScreen: false,
            isCardListScreen: false,
            isFacematchScreen: false,
            isBarcodeScreen: false,
            objScanRes: res,
          });
        }
      });
    }
  };

  onPressBarcode = () => {
    var isValid = true;
    if (this.barcodeSelected?.toString() === '') {
      this.setState({isValidBarcodeType: false});
      isValid = false;
    }

    if (isValid) {
      let passArgs = [this.barcodeSelected];
      //Method for start MRZ scaning from native OS.
      AccurascanKyc.startBarcode(passArgs, (error, response) => {
        if (error != null) {
          console.log('Failure!', error);
          this.showAlert('Failure!', error);
        } else {
          const res = this.getResultJSON(response);
          this.result = res;
          this.setState({
            isResultScreen: true,
            isMainScreen: false,
            isOCRScreen: false,
            isCardListScreen: false,
            isFacematchScreen: false,
            isBarcodeScreen: false,
            objScanRes: res,
          });
        }
      });
    }
  };

  onPressStartLiveness = () => {
    var accuraConfs = {
      face_uri: this.facematchURI,
    };

    var lconfig = {
      backGroundColor: '#FFC4C4C5',
      closeIconColor: '#FF000000',
      feedbackBackGroundColor: '#FFC4C4C5',
      feedbackTextColor: '#FF000000',
      setFeedbackTextSize: 18,
      setFeedBackframeMessage: 'Frame Your Face',
      setFeedBackAwayMessage: 'Move Phone Away',
      setFeedBackOpenEyesMessage: 'Keep Your Eyes Open',
      setFeedBackCloserMessage: 'Move Phone Closer',
      setFeedBackCenterMessage: 'Move Phone Center',
      setFeedbackMultipleFaceMessage: 'Multiple Face Detected',
      setFeedBackFaceSteadymessage: 'Keep Your Head Straight',
      setFeedBackBlurFaceMessage: 'Blur Detected Over Face',
      setFeedBackGlareFaceMessage: 'Glare Detected',
      setBlurPercentage: 80,
      setGlarePercentage_0: -1,
      setGlarePercentage_1: -1,
      setLivenessURL: 'your url',
      setFeedBackLowLightMessage: 'Low light detected',
      feedbackLowLightTolerence: 39,
      feedbackDialogMessage: 'Loading...',
      feedBackProcessingMessage: 'Processing...',
      isShowLogo: 1,
    };

    let passArgs = [accuraConfs, lconfig];

    AccurascanKyc.startLiveness(passArgs, (error, response) => {
      if (error != null) {
        console.log('Failure!', error);
        this.showAlert('Failure!', error);
        this.setState({modalVisible: true});
      } else {
        const res = this.getResultJSON(response);
        this.setState({
          fm_score: res.face_score,
          lv_score: res.score,
          secondImageURI: res.detect,
          isResultScreen: true,
          isMainScreen: false,
          isOCRScreen: false,
          isCardListScreen: false,
          isFacematchScreen: false,
          isBarcodeScreen: false,
        });
      }
    });
  };

  onPressFaceMatch = () => {
    var accuraConfs = {
      face_uri: this.facematchURI,
    };
    var fconfig = {
      backGroundColor: '#FFC4C4C5',
      closeIconColor: '#FF000000',
      feedbackBackGroundColor: '#FFC4C4C5',
      feedbackTextColor: '#FF000000',
      setFeedbackTextSize: 18,
      setFeedBackframeMessage: 'Frame Your Face',
      setFeedBackAwayMessage: 'Move Phone Away',
      setFeedBackOpenEyesMessage: 'Keep Your Eyes Open',
      setFeedBackCloserMessage: 'Move Phone Closer',
      setFeedBackCenterMessage: 'Move Phone Center',
      setFeedbackMultipleFaceMessage: 'Multiple Face Detected',
      setFeedBackFaceSteadymessage: 'Keep Your Head Straight',
      setFeedBackLowLightMessage: 'Low light detected',
      setFeedBackBlurFaceMessage: 'Blur Detected Over Face',
      setFeedBackGlareFaceMessage: 'Glare Detected',
      setBlurPercentage: 80,
      setGlarePercentage_0: -1,
      setGlarePercentage_1: -1,
      feedbackDialogMessage: 'Loading...',
      feedBackProcessingMessage: 'Processing...',
      isShowLogo: 1,
    };
    let passArgs = [accuraConfs, fconfig];

    AccurascanKyc.startFaceMatch(passArgs, (error, response) => {
      if (error != null) {
        console.log('Failur!', error);
        this.showAlert('Failur!', error);
        this.setState({modalVisible: true});
      } else {
        const res = this.getResultJSON(response);
        this.setState({
          fm_score: res.score,
          lv_score: 0.0,
          secondImageURI: res.detect,
          isResultScreen: true,
          isOCRScreen: false,
          isCardListScreen: false,
          // modalVisible: true,
        });
      }
    });
  };

  onPressFaceMatch1 = () => {
    var accuraConfs = {
      face1: this.state.FirstFMImageURI,
      face2: this.state.SecondFMImageURI,
    };
    var fconfig = {
      backGroundColor: '#FFC4C4C5',
      closeIconColor: '#FF000000',
      feedbackBackGroundColor: '#FFC4C4C5',
      feedbackTextColor: '#FF000000',
      setFeedbackTextSize: 18,
      setFeedBackframeMessage: 'Frame Your Face',
      setFeedBackAwayMessage: 'Move Phone Away',
      setFeedBackOpenEyesMessage: 'Keep Your Eyes Open',
      setFeedBackCloserMessage: 'Move Phone Closer',
      setFeedBackCenterMessage: 'Move Phone Center',
      setFeedbackMultipleFaceMessage: 'Multiple Face Detected',
      setFeedBackFaceSteadymessage: 'Keep Your Head Straight',
      setFeedBackLowLightMessage: 'Low light detected',
      setFeedBackBlurFaceMessage: 'Blur Detected Over Face',
      setFeedBackGlareFaceMessage: 'Glare Detected',
      setBlurPercentage: 80,
      setGlarePercentage_0: -1,
      setGlarePercentage_1: -1,
      feedbackDialogMessage: 'Loading...',
      feedBackProcessingMessage: 'Processing...',
      isShowLogo: 1,
    };
    let passArgs = [accuraConfs, fconfig];

    AccurascanKyc.startFaceMatch1(passArgs, (error, response) => {
      if (error != null) {
        console.log('Failure!', error);
        this.showAlert('Failure!', error);
        this.setState({fmmodalViseble: true});
      } else {
        const res = this.getResultJSON(response);
        this.setState({
          fm_score: res.score,
          FirstFMImageURI: res.Image,
          isFacematchScreen: true,
        });
      }
    });
  };

  onPressFaceMatch2 = () => {
    var accuraConfs = {
      face1: this.state.FirstFMImageURI,
      face2: this.state.SecondFMImageURI,
    };
    var fconfig = {
      backGroundColor: '#FFC4C4C5',
      closeIconColor: '#FF000000',
      feedbackBackGroundColor: '#FFC4C4C5',
      feedbackTextColor: '#FF000000',
      setFeedbackTextSize: 18,
      setFeedBackframeMessage: 'Frame Your Face',
      setFeedBackAwayMessage: 'Move Phone Away',
      setFeedBackOpenEyesMessage: 'Keep Your Eyes Open',
      setFeedBackCloserMessage: 'Move Phone Closer',
      setFeedBackCenterMessage: 'Move Phone Center',
      setFeedbackMultipleFaceMessage: 'Multiple Face Detected',
      setFeedBackFaceSteadymessage: 'Keep Your Head Straight',
      setFeedBackLowLightMessage: 'Low light detected',
      setFeedBackBlurFaceMessage: 'Blur Detected Over Face',
      setFeedBackGlareFaceMessage: 'Glare Detected',
      setBlurPercentage: 80,
      setGlarePercentage_0: -1,
      setGlarePercentage_1: -1,
      feedbackDialogMessage: 'Loading...',
      feedBackProcessingMessage: 'Processing...',
      isShowLogo: 1,
    };
    let passArgs = [accuraConfs, fconfig];

    AccurascanKyc.startFaceMatch2(passArgs, (error, response) => {
      if (error != null) {
        console.log('Failure!', error);
        this.showAlert('Failure!', error);
        this.setState({fmmodalViseble: true});
      } else {
        const res = this.getResultJSON(response);
        this.setState({
          fm_score: res.score,
          SecondFMImageURI: res.Image,
          isFacematchScreen: true,
        });
      }
    });
  };

  openGallery = () => {
    var accuraConfs = {
      face1: this.state.FirstFMImageURI,
      face2: this.state.SecondFMImageURI,
    };

    AccurascanKyc.openGallery1([accuraConfs], (error, response) => {
      if (error != null) {
        console.log('Failure!', error);
        this.showAlert('Failure!', error);
        this.setState({fmmodalViseble: true});
      } else {
        const res = this.getResultJSON(response);
        this.setState({
          fm_score: res.score,
          FirstFMImageURI: res.Image,
          isFacematchScreen: true,
        });
      }
    });
  };

  openGallery2 = () => {
    var accuraConfs = {
      face1: this.state.FirstFMImageURI,
      face2: this.state.SecondFMImageURI,
    };

    AccurascanKyc.openGallery2([accuraConfs], (error, response) => {
      if (error != null) {
        console.log('Failure!', error);
        this.showAlert('Failure!', error);
        this.setState({fmmodalViseble: true});
      } else {
        const res = this.getResultJSON(response);
        this.setState({
          fm_score: res.score,
          SecondFMImageURI: res.Image,
          isFacematchScreen: true,
        });
      }
    });
  };

  onPressMRZ = () => {
    var isValid = true;
    if (this.mrzSelected === '' || this.mrzSelected === null) {
      this.setState({isValidType: false});
      isValid = false;
    }

    if (isValid) {
      let passArgs = [this.mrzSelected];
      //Method for start MRZ scaning from native OS.
      AccurascanKyc.startMRZ(passArgs, (error, response) => {
        if (error != null) {
          console.log('Failure!', error);
          this.showAlert('Failure!', error);
        } else {
          const res = this.getResultJSON(response);
          this.result = res;
          this.setState({
            isResultScreen: true,
            isCardListScreen: false,
            isFacematchScreen: false,
            isBarcodeScreen: false,
            objScanRes: res,
            isOCRScreen: false,
          });
        }
      });
    }
  };

  getResultJSON = jsonString => {
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

  handleBackButtonClick() {
    if (this.state.isMainScreen) {
      return false;
    } else if (this.state.isOCRScreen) {
      this.setState({
        isOCRScreen: false,
        isMainScreen: true,
        isCardListScreen: false,
        isResultScreen: false,
        isFacematchScreen: false,
        isBarcodeScreen: false,
      });
      return true;
    } else if (this.state.isCardListScreen) {
      this.setState({
        isOCRScreen: true,
        isMainScreen: false,
        isCardListScreen: false,
        isResultScreen: false,
        isFacematchScreen: false,
        isBarcodeScreen: false,
      });
      return true;
    } else if (this.state.isBarcodeScreen) {
      this.setState({
        isOCRScreen: false,
        isMainScreen: false,
        isCardListScreen: true,
        isResultScreen: false,
        isFacematchScreen: false,
        isBarcodeScreen: false,
      });
      return true;
    } else if (this.state.isFacematchScreen) {
      this.setState({
        isOCRScreen: false,
        isMainScreen: true,
        isCardListScreen: false,
        isResultScreen: false,
        isFacematchScreen: false,
        isBarcodeScreen: false,
        FirstFMImageURI: '',
        SecondFMImageURI: '',
        fm_score: 0.0,
      });
      return true;
    } else if (this.state.isResultScreen) {
      this.setState({
        isOCRScreen: true,
        isMainScreen: false,
        isCardListScreen: false,
        isResultScreen: false,
        isFacematchScreen: false,
        isBarcodeScreen: false,
        fm_score: 0.0,
        lv_score: 0.0,
        secondImageURI: '',
      });
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.state.isMainScreen) {
      return (
        <ImageBackground
          source={require('./assets/images/background.png')}
          style={styles.backgroundView}>
          {this.state.isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#d32d38" />
            </View>
          ) : (
            <>
              {
                <SafeAreaView>
                  <View style={styles.container}>
                    <Image
                      source={require('./assets/images/logo.png')}
                      style={styles.logoView}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          isOCRScreen: true,
                          isMainScreen: false,
                          isCardListScreen: false,
                          isResultScreen: false,
                          isFacematchScreen: false,
                          isBarcodeScreen: false,
                        });
                      }}>
                      <Image
                        source={require('./assets/images/OCR.jpg')}
                        style={styles.FirstView}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          isFacematchScreen: true,
                          isMainScreen: false,
                          isOCRScreen: false,
                          isCardListScreen: false,
                          isResultScreen: false,
                          isBarcodeScreen: false,
                        });
                      }}>
                      <Image
                        source={require('./assets/images/Facematch.jpg')}
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
    } else if (this.state.isOCRScreen) {
      return (
        <ImageBackground
          source={require('./assets/images/background.png')}
          style={styles.backgroundView}>
          <>
            <SafeAreaView>
              <AppBar
                style={styles.appBar}
                title="Accura KYC"
                leading={
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        isMainScreen: true,
                        isOCRScreen: false,
                        isCardListScreen: false,
                        isResultScreen: false,
                        isFacematchScreen: false,
                        isBarcodeScreen: false,
                      });
                    }}>
                    <Image
                      style={{aspectRatio: 1, width: 18}}
                      source={require('./assets/images/backpress.png')}
                    />
                  </TouchableOpacity>
                }
              />
              <View style={{paddingBottom: 30}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{paddingBottom: 100}}>
                    {this.state.ocrContries.map(Country => {
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              console.log('country selected', Country.value);
                              if (
                                Country.label === 'Passport' ||
                                Country.label === 'Mrz ID' ||
                                Country.label === 'Visa Card' ||
                                Country.label === 'Other'
                              ) {
                                this.mrzSelected = Country.value;
                                this.onPressMRZ();
                              } else if (Country.label === 'Barcode') {
                                this.setState({
                                  isMainScreen: false,
                                  isOCRScreen: false,
                                  isCardListScreen: false,
                                  isResultScreen: false,
                                  isFacematchScreen: false,
                                  isBarcodeScreen: true,
                                });
                              } else if (Country.label === 'BankCard') {
                                this.onPressBankcard();
                              } else {
                                this.countrySelected =
                                  this.state.objSDKRes?.countries[
                                    Country.value
                                  ];
                                this.cardSelected = this.countrySelected.cards;

                                this.state.cardList =
                                  this.countrySelected.cards;
                                this.setState({
                                  isOCRScreen: false,
                                  isCardListScreen: true,
                                });
                              }
                            }}>
                            {Country.label === 'Passport' ||
                            Country.label === 'Mrz ID' ||
                            Country.label === 'Visa Card' ||
                            Country.label === 'Other' ||
                            Country.label === 'Barcode' ||
                            Country.label === 'BankCard' ? (
                              <Text
                                style={{
                                  flex: 1,
                                  backgroundColor: 'grey',
                                  color: 'white',
                                  padding: 15,
                                  margin: 5,
                                  height: 50,
                                  textAlign: 'left',
                                  borderRadius: 10,
                                  fontWeight: 'bold',
                                  overflow: 'hidden',
                                }}>
                                {Country.label}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  flex: 1,
                                  backgroundColor: 'red',
                                  color: 'white',
                                  padding: 15,
                                  margin: 5,
                                  height: 50,
                                  textAlign: 'left',
                                  borderRadius: 10,
                                  fontWeight: 'bold',
                                  overflow: 'hidden',
                                }}>
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
    } else if (this.state.isCardListScreen) {
      return (
        <>
          <SafeAreaView>
            <AppBar
              style={styles.appBar}
              title="Accura KYC"
              leading={
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      isMainScreen: false,
                      isCardListScreen: false,
                      isResultScreen: false,
                      isFacematchScreen: false,
                      isBarcodeScreen: false,
                      isOCRScreen: true,
                    });
                  }}>
                  <Image
                    style={{aspectRatio: 1, width: 18}}
                    source={require('./assets/images/backpress.png')}
                  />
                </TouchableOpacity>
              }
            />
          </SafeAreaView>

          <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <View
                style={{ flex: 1, padding: 20, backgroundColor: '#ffffff' }}
              > */}
              {this.cardSelected.map(Cards => {
                return (
                  <View
                    style={{
                      backgroundColor: '#ffffff',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.cardSelected.id = Cards.id;
                        this.cardSelected.name = Cards.name;
                        this.cardSelected.type = Cards.type;
                        this.onPressOCR();
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 'bold',
                          borderRadius: 10,
                          color: 'white',
                          backgroundColor: 'red',
                          padding: 15,
                          margin: 5,
                          height: 50,
                          textAlign: 'left',
                          overflow: 'hidden',
                        }}>
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
    } else if (this.state.isFacematchScreen) {
      return (
        <>
          <SafeAreaView>
            <AppBar
              style={styles.appBar}
              title="Accura KYC"
              leading={
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      isMainScreen: true,
                      isOCRScreen: false,
                      isCardListScreen: false,
                      isResultScreen: false,
                      isFacematchScreen: false,
                      isBarcodeScreen: false,
                      FirstFMImageURI: '',
                      SecondFMImageURI: '',
                      fm_score: 0.0,
                      lv_score: 0.0,
                    });
                  }}>
                  <Image
                    style={{aspectRatio: 1, width: 18}}
                    source={require('./assets/images/backpress.png')}
                  />
                </TouchableOpacity>
              }
            />
          </SafeAreaView>

          <View style={{flex: 1, padding: 20, backgroundColor: '#00000066'}}>
            <View style={styles.modelFace}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  style={styles.faceImageView}
                  source={{uri: this.state.FirstFMImageURI}}
                />
                <Image
                  style={[styles.faceImageView, {marginLeft: 50}]}
                  source={{uri: this.state.SecondFMImageURI}}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    this.setState({modalVisible: false});
                    this.onPressFaceMatch1();
                  }}>
                  <View style={styles.btnView}>
                    <Image
                      style={{aspectRatio: 1, width: 18}}
                      source={require('./assets/images/cam.png')}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        marginLeft: 5,
                      }}>
                      Camera
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    this.setState({modalVisible: false});
                    this.onPressFaceMatch2();
                  }}>
                  <View style={styles.btnView}>
                    <Image
                      style={{aspectRatio: 1, width: 18}}
                      source={require('./assets/images/cam.png')}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        marginLeft: 5,
                      }}>
                      Camera
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10,
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    this.setState({modalVisible: false});
                    this.openGallery();
                  }}>
                  <View style={styles.btnView}>
                    <Image
                      style={{aspectRatio: 1, width: 18}}
                      source={require('./assets/images/gallery.png')}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        marginLeft: 5,
                      }}>
                      Gallery
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    this.setState({modalVisible: false});
                    this.openGallery2();
                  }}>
                  <View style={styles.btnView}>
                    <Image
                      style={{aspectRatio: 1, width: 18}}
                      source={require('./assets/images/gallery.png')}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        marginLeft: 5,
                      }}>
                      Gallery
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 10,
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#000000',
                  }}>
                  {this.state.fm_score != null
                    ? parseInt(this.state.fm_score).toFixed(2) + '%'
                    : '0.00%'}
                </Text>
              </View>
            </View>
          </View>
        </>
      );
    } else if (this.state.isResultScreen) {
      if (this.result === undefined || this.result === null) {
        return;
      }

      if (this.result.hasOwnProperty('face')) {
        this.facematchURI = this.result?.face;
      }
      var sides = ['front_data', 'back_data'];
      return (
        <>
          <SafeAreaView>
            <AppBar
              style={styles.appBar}
              title="Accura KYC"
              leading={
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      isOCRScreen: true,
                      isMainScreen: false,
                      isCardListScreen: false,
                      isResultScreen: false,
                      isFacematchScreen: false,
                      isBarcodeScreen: false,
                      fm_score: 0.0,
                      lv_score: 0.0,
                      secondImageURI: '',
                    });
                  }}>
                  <Image
                    style={{aspectRatio: 1, width: 18}}
                    source={require('./assets/images/backpress.png')}
                  />
                </TouchableOpacity>
              }
            />
          </SafeAreaView>
          <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  flex: 1,
                }}>
                {this.result.hasOwnProperty('face') ? (
                  <View style={styles.modelFace}>
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        style={styles.faceImageView}
                        source={{uri: this.result?.face}}
                      />
                      {this.state.secondImageURI !== '' ? (
                        <Image
                          style={[styles.faceImageView, {marginLeft: 50}]}
                          source={{uri: this.state.secondImageURI}}
                        />
                      ) : (
                        <View />
                      )}
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginVertical: 10,
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => {
                          this.setState({modalVisible: false});
                          this.onPressStartLiveness();
                        }}>
                        <View style={styles.btnView}>
                          <Image
                            style={{aspectRatio: 1, width: 18}}
                            source={require('./assets/images/ic_liveness.png')}
                          />
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 15,
                              marginLeft: 5,
                            }}>
                            LIVENESS
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => {
                          this.setState({modalVisible: false});
                          this.onPressFaceMatch();
                        }}>
                        <View style={styles.btnView}>
                          <Image
                            style={{aspectRatio: 1, width: 18}}
                            source={require('./assets/images/ic_biometric.png')}
                          />
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 15,
                              marginLeft: 5,
                            }}>
                            FACE MATCH
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: 10,
                        justifyContent: 'space-around',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: '#000000',
                        }}>
                        {parseInt(this.state.lv_score).toFixed(2) + '%'}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: '#000000',
                        }}>
                        {parseInt(this.state.fm_score).toFixed(2) + '%'}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View />
                )}

                <View style={{marginTop: -20}}>
                  {sides.map((side, index) => {
                    return (
                      <View key={index.toString()}>
                        {this.result.hasOwnProperty(side) ? (
                          Object.keys(this.result[side]).length > 0 ? (
                            <View>
                              {index === 0 ? (
                                <View style={styles.dataHeader}>
                                  <Text
                                    style={{fontSize: 18, fontWeight: 'bold'}}>
                                    {this.getResultType(this.result?.type)}
                                  </Text>
                                </View>
                              ) : (
                                <View style={styles.dataHeader}>
                                  <Text
                                    style={{fontSize: 18, fontWeight: 'bold'}}>
                                    {'OCR Back'}
                                  </Text>
                                </View>
                              )}
                              {Object.keys(this.result[side]).map(
                                (key, index) => {
                                  return (
                                    <View key={index.toString()}>
                                      {key !== 'PDF417' ? (
                                        ![
                                          'signature',
                                          'front_img',
                                          'back_img',
                                        ].includes(key) ? (
                                          this.result.type === 'MRZ' ? (
                                            <View style={styles.dataItem}>
                                              <Text style={styles.lblDataTitle}>
                                                {this.getMRZLable(key)}
                                              </Text>
                                              <Text style={styles.lblDataText}>
                                                {this.result[side][
                                                  key
                                                ].toString()}
                                              </Text>
                                            </View>
                                          ) : (
                                            <View style={styles.dataItem}>
                                              <Text style={styles.lblDataTitle}>
                                                {key}
                                              </Text>
                                              <Text style={styles.lblDataText}>
                                                {this.result[side][
                                                  key
                                                ].toString()}
                                              </Text>
                                            </View>
                                          )
                                        ) : key === 'signature' ? (
                                          <View style={styles.dataItem}>
                                            <Text style={styles.lblDataTitle}>
                                              {key}
                                            </Text>
                                            <Image
                                              style={styles.signatureImage}
                                              source={{
                                                uri: this.result[side][key],
                                              }}
                                            />
                                          </View>
                                        ) : (
                                          <View />
                                        )
                                      ) : (
                                        <View />
                                      )}
                                    </View>
                                  );
                                },
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
                  {this.result.hasOwnProperty('mrz_data') ? (
                    Object.keys(this.result.mrz_data).length > 0 ? (
                      <>
                        <View style={styles.dataHeader}>
                          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                            {'MRZ'}
                          </Text>
                        </View>
                        {Object.keys(this.result.mrz_data).map((key, index) => {
                          return (
                            <View
                              style={styles.dataItem}
                              key={index.toString()}>
                              <Text style={styles.lblDataTitle}>
                                {this.getMRZLable(key)}
                              </Text>
                              <Text style={styles.lblDataText}>
                                {this.result.mrz_data[key].toString()}
                              </Text>
                            </View>
                          );
                        })}
                      </>
                    ) : (
                      <View />
                    )
                  ) : (
                    <View />
                  )}
                </View>
                {this.result.hasOwnProperty('front_img') ? (
                  <View>
                    <View style={styles.dataHeader}>
                      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        {'FRONT SIDE'}
                      </Text>
                    </View>
                    <View style={{marginVertical: 10, borderRadius: 10}}>
                      <Image
                        style={styles.cardImage}
                        source={{uri: this.result.front_img}}
                      />
                    </View>
                  </View>
                ) : (
                  <View />
                )}

                {this.result.hasOwnProperty('back_img') ? (
                  <View>
                    <View style={styles.dataHeader}>
                      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        {'BACK SIDE'}
                      </Text>
                    </View>
                    <View style={{marginVertical: 10, borderRadius: 10}}>
                      <Image
                        style={styles.cardImage}
                        source={{uri: this.result.back_img}}
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
    } else if (this.state.isBarcodeScreen) {
      return (
        <>
          <SafeAreaView>
            <AppBar
              style={styles.appBar}
              title="Accura KYC"
              leading={
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      isMainScreen: false,
                      isCardListScreen: false,
                      isResultScreen: false,
                      isFacematchScreen: false,
                      isBarcodeScreen: false,
                      isOCRScreen: true,
                    });
                  }}>
                  <Image
                    style={{aspectRatio: 1, width: 18}}
                    source={require('./assets/images/backpress.png')}
                  />
                </TouchableOpacity>
              }
            />
          </SafeAreaView>

          <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <View
                style={{ flex: 1, padding: 20, backgroundColor: '#ffffff' }}
              > */}
              {this.state.barcodeTypes.map(Cards => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        console.log(Cards);
                        this.barcodeSelected = Cards.value;
                        this.onPressBarcode();
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 'bold',
                          borderRadius: 10,
                          color: 'white',
                          backgroundColor: 'red',
                          padding: 15,
                          margin: 5,
                          height: 50,
                          textAlign: 'left',
                          overflow: 'hidden',
                        }}>
                        {Cards.label}
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
  }
  getResultType = type => {
    switch (type) {
      case 'BANKCARD':
        return 'Bank Card Data';
      case 'DL_PLATE':
        return 'Vehicle Plate';
      case 'BARCODE':
        return 'Barcode Data';
      case 'PDF417':
        return 'PDF417 Barcode';
      case 'OCR':
        return 'OCR Front';
      case 'MRZ':
        return 'MRZ';
      case 'BARCODEPDF417':
        return 'USA DL Result';
      default:
        return 'Front Side';
    }
  };

  getMRZLable = key => {
    var lableText = '';
    switch (key) {
      case 'lines':
        lableText += 'MRZ';
        break;
      case 'placeOfBirth':
        lableText += 'Place Of Birth';
        break;
      case 'retval':
        lableText += 'Retval';
        break;
      case 'givenNames':
        lableText += 'First Name';
        break;
      case 'country':
        lableText += 'Country';
        break;
      case 'surName':
        lableText += 'Last Name';
        break;
      case 'expirationDate':
        lableText += 'Date of Expiry';
        break;
      case 'passportType':
        lableText += 'Document Type';
        break;
      case 'personalNumber':
        lableText += 'Other ID';
        break;
      case 'correctBirthChecksum':
        lableText += 'Correct Birth Check No.';
        break;
      case 'correctSecondrowChecksum':
        lableText += 'Correct Second Row Check No.';
        break;
      case 'personalNumberChecksum':
        lableText += 'Other Id Check No.';
        break;
      case 'secondRowChecksum':
        lableText += 'Second Row Check No.';
        break;
      case 'expirationDateChecksum':
        lableText += 'Expiration Check No.';
        break;
      // case 'correctPersonalChecksum':
      //   lableText += 'Correct Document check No.';
      //   break;
      case 'passportNumber':
        lableText += 'Document No.';
        break;
      case 'correctExpirationChecksum':
        lableText += 'Correct Expiration Check No.';
        break;
      case 'sex':
        lableText += 'Sex';
        break;
      case 'birth':
        lableText += 'Date Of Birth';
        break;
      case 'birthChecksum':
        lableText += 'Birth Check No.';
        break;
      case 'personalNumber2':
        lableText += 'Other ID2';
        break;
      case 'correctPassportChecksum':
        lableText += 'Correct Document check No.';
        break;
      case 'placeOfIssue':
        lableText += 'Place Of Issue';
        break;
      case 'nationality':
        lableText += 'Nationality';
        break;
      case 'passportNumberChecksum':
        lableText += 'Document check No.';
        break;
      case 'issueDate':
        lableText += 'Date Of Issue';
        break;
      case 'departmentNumber':
        lableText += 'Department No.';
        break;
      default:
        lableText += key;
        break;
    }
    return lableText;
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    // flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
  },

  appBar: {
    padding: 5,
    backgroundColor: 'red',
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
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
  modelFace: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  faceImageView: {
    height: 140,
    width: 100,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
  },
  btnView: {
    flexDirection: 'row',
    backgroundColor: '#d22c39',
    width: 130,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
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
});
