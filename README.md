# React Native Accura Scan KYC

Accura Scan OCR is used for Optical character recognition.

Accura Scan Face Match is used for Matching 2 Faces, Source face and Target face. It matches the User Image from a Selfie vs User Image in document.

Accura Scan Authentication is used for your customer verification and authentication. Unlock the True Identity of Your Users with 3D Selfie Technology

Below steps to setup Accura Scan's SDK to your project.

## Note:-

`yarn add 'accurascan_kyc'`

**Usage**
Import flutter library into file.
`import AccurascanKyc from 'accurascan_kyc';`


## 1.Setup Android

**Add it in your root build.gradle at the end of repositories.**

```
allprojects {
   repositories {
       google()
       jcenter()
       maven {
           url 'https://jitpack.io'
           credentials { username 'jp_ssguccab6c5ge2l4jitaj92ek2' }
       }
    }
}
```

**Add it in your app/build.gradle file.**

```
packagingOptions {
   pickFirst 'lib/arm64-v8a/libcrypto.so'
   pickFirst 'lib/arm64-v8a/libssl.so'

   pickFirst 'lib/armeabi-v7a/libcrypto.so'
   pickFirst 'lib/armeabi-v7a/libssl.so'

   pickFirst 'lib/x86/libcrypto.so'
   pickFirst 'lib/x86/libssl.so'

   pickFirst 'lib/x86_64/libcrypto.so'
   pickFirst 'lib/x86_64/libssl.so'

}
splits {
  abi {
    enable true
    reset()
    include 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
    universalApk true
  }
}
```

## 2.Setup iOS

1.Install Git LFS using command install `git-lfs`

2.Run `pod install`

3.Add the following in your podfile
`use_frameworks!` below `prepare_react_native_project!`

and

```
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        # Bitcode is deprecated by Apple
        config.build_settings['ENABLE_BITCODE'] = 'NO'
      end
    end
```

below
```
  post_install do |installer|
    react_native_post_install(
      installer,
      # Set `mac_catalyst_enabled` to `true` in order to apply patches
      # necessary for Mac Catalyst builds
      :mac_catalyst_enabled => false
    )
```

take reference from [here](https://github.com/Anaslokhandwala/Accurascan_KYC/blob/master/ios/Podfile)

**Add this permissions into iOS Info.plist file.**

```
<key>NSCameraUsageDescription</key>
<string>App usage camera for scan documents.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>App usage photos for get document picture.</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>App usage photos for save document picture.</string>
```

## 3.Setup Accura Scan licenses into your projects

Accura Scan has two license require for use full functionality of this library. Generate your own Accura license from [here](https://accurascan.com/developer/dashboard)

**key.license**

This license is compulsory for this library to work. it will get all setup of accura SDK.

**accuraface.license**

This license is use for get face match percentages between two face pictures.

**For Android**

```
Create "assets" folder under app/src/main and Add license file in to assets folder.
- key.license // for Accura Scan OCR
- accuraface.license // for Accura Scan Face Match
Generate your Accura Scan license from https://accurascan.com/developer/dashboard
```

**For iOS**

```
Place both the license in your project's Runner directory, and add the licenses to the target.
```

## 4.Get license configuration from SDK. It returns all active functionalities of your license.

### Setting up License

```
  getAccuraSetup = () => {
    //Method for get license info from native OS.
    AccurascanKyc.getMetaData((error, response) => {
      if (error != null) {

      } else {
        console.log(response);
      }
    });
  };
```

**Error:** String

**Success:** JSON String Response = {

**countries:** Array[<CountryModels>],

**barcodes:** Array[],

**isValid:** boolean,

**isOCREnable:** boolean,

**isBarcodeEnable:** boolean,

**isBankCardEnable:** boolean,

**isMRZEnable:** boolean

}

### Setting up Configuration's,Error mssages and Scaning title messages

```
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
      enableLogs: 1,
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
          console.log('Failur!', error);
        } else {
          console.log('Message:- ', response);
        }
      }
    );
  };

```

## 5.Method for scan MRZ documents.

```
onPressMRZ = () => {
 var isValid = true;
 if (this.mrzSelected === '' || this.mrzSelected === null) {
   this.setState({ isValidType: false });
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
       console.log('Success!', response);
     }
   });
 }
};
```

**MRZType:** String

#### value: other_mrz or passport_mrz or id_mrz or visa_mrz<br></br>

**Success:** JSON Response {

**front_data:** JSONObjects?,

**back_data:** JSONObjects?,

**type:** Recognition Type,

**face:** URI?

**front_img:** URI?

**back_img:** URI?

}

**Error:** String

## 6.Method for scan OCR documents.

```
onPressOCR = () => {
 var isValid = true;
 if (this.countrySelected === null || this.countrySelected === '') {
   this.setState({ isValidCountry: false });
   isValid = false;
 }

 if (this.cardSelected === null || this.cardSelected === '') {
   this.setState({ isValidCard: false });
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
     } else {
       console.log('Success!', response);
     }
   });
 }
};
```

**CountryId:** integer

**value:** Id of selected country.

**CardId:** integer

**value:** Id of selected card.

**CardName:** String

**value:** Name of selected card.

**CardType:** integer

**value:** Type of selected card.

**Success:** JSON Response {
}

**Error:** String

## 7.Method for scan barcode.

```
onPressBarcode = () => {
 var isValid = true;
 if (this.barcodeSelected?.toString() === '') {
   this.setState({ isValidBarcodeType: false });
   isValid = false;
 }

 if (isValid) {
   let passArgs = [this.barcodeSelected];
   //Method for start MRZ scaning from native OS.
   AccurascanKyc.startBarcode(passArgs, (error, response) => {
     if (error != null) {
       console.log('Failure!', error);
     } else {
       console.log('Success!', response);
     }
   });
 }
};
```

**BarcodeType:** String

**value:** Type of barcode documents.

**Success:** JSON Response {
}

**Error:** String

## 8.Method for scan bankcard.

```
onPressBankcard = () => {
 AccurascanKyc.startBankCard((error, response) => {
   if (error != null) {
     console.log('Failure!', error);
   } else {
      console.log('Success!', response);
   }
 });
};
```

**Success:** JSON Response {
}

**Error:** String

## 8.Method for get face match percentages between two face.

```
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
   } else {
     console.log('Success!', response);
   }
 });
};
```

**accuraConfs:** JSON Object

**face_uri:** URI

**Success:** JSON Response {
detect: URI?
score: Float
}

**Error:** String

## 9.Method for liveness check.

```
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
   setLivenessURL: 'Your URL',
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
   } else {
     console.log('Success!', response);
   }
 });
};
```

**accuraConfs:** JSON Object

**face_uri:** 'uri of face'

**Success:** JSON Response {

detect: URI?,

Face_score: Float,

score: Float,

}

**Error:** String

## 10.Method for Only Facematch.(The following are Optional methods, Use if you need only FaceMatch)

### To Open Gallery 1 and 2:-

_For gallery 1_

```
openGallery = () => {
 var accuraConfs = {
   face1: this.state.FirstFMImageURI,
   face2: this.state.SecondFMImageURI,
 };

 AccurascanKyc.openGallery1([accuraConfs], (error, response) => {
   if (error != null) {
     console.log('Failure!', error);
   } else {
     console.log('Success!', response);
   }
 });
};
```

_For gallery 2_

```
  openGallery2 = () => {
    var accuraConfs = {
      face1: this.state.FirstFMImageURI,
      face2: this.state.SecondFMImageURI,
    };

    AccurascanKyc.openGallery2([accuraConfs], (error, response) => {
      if (error != null) {
        console.log('Failure!', error);
      } else {
        console.log('Success!', response);
      }
    });
  };
```

### To Open Camera for Facematch 1 and 2:

_For Facematch 1:_

```
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
      } else {
        console.log('Success!', response);
      }
    });
  };
```

_For Facematch 2_

```
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
      } else {
        console.log('Success!', response);
      }
    });
  };
```

**accuraConfs:** JSON Object

**Face1:** 'uri of face1'

**Face2:** ’uri of face2’

**Success:** JSON Response {

**Image:** URI?,

**score:** String,
}

**Error:** String

Contributing
See the contributing guide to learn how to contribute to the repository and the development workflow.

License:
MIT
