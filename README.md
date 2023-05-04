# React Native Accura Scan KYC

Accura Scan OCR is used for Optical character recognition.

Accura Scan Face Match is used for Matching 2 Faces, Source face and Target face. It matches the User Image from a Selfie vs User Image in document.

Accura Scan Authentication is used for your customer verification and authentication. Unlock the True Identity of Your Users with 3D Selfie Technology

Below steps to setup Accura Scan's SDK to your project.

## Note:-

`yarn add 'accurascan_kyc'`

OR

`npm i accurascan_kyc`

**Usage**
Import npm library into file.
`import AccurascanKyc from 'accurascan_kyc';`

## 1.Setup Android

**Add it in your root build.gradle at the end of repositories.**

```
buildscript {
...
}

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
android {
...

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
    ...
    enable true
    include 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
  }
 }
}
```

## 2.Setup iOS

1.Install Git LFS using command install `brew install git-lfs` OR `port install git-lfs`

Verify that the installation was successful:

```
$ git lfs install
> Git LFS initialized.
```

2.Add the following in your podfile
`use_frameworks!` below `prepare_react_native_project!`

and comment this line `:flipper_configuration => flipper_config`

take reference from [here](https://github.com/Anaslokhandwala/Accurascan_KYC/blob/master/ios/Podfile)

3.Run `pod install`

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

Accura Scan has two license require for use full functionality of this library. Generate your own Accura license from [here](https://accurascan.com/developer/dashboard) using your bundle id.

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
Place both the license in your <project name>/ios/project's directory, and add the licenses to the target.
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
countries: Array[<CountryModels>],
barcodes: Array[],
isValid: boolean,
isOCREnable: boolean,
isBarcodeEnable: boolean,
isBankCardEnable: boolean,
isMRZEnable: boolean
}

### Setting up Configuration's,Error mssages and Scaning title messages

```
   setUpCustomMessages = () => {
    var config = {
      setFaceBlurPercentage: 80,   // 0 for clean face and 100 for Blurry face
      setHologramDetection: true,  // true to check hologram on face
      setLowLightTolerance: 10,    // 0 for full dark document and 100 for full bright document
      setMotionThreshold: 25,      // 1 - allows 1% motion on document and 100 - it can not detect motion and allow document to scan.
      setMinGlarePercentage: 6,    // Set min percentage for glare
      setMaxGlarePercentage: 99,   // Set max percentage for glare
      setBlurPercentage: 60,       //0 for clean document and 100 for Blurry document
    };

    var accuraConfigs = {
      enableLogs: 0,
      isShowLogo: 1,     //To hide Logo pass 0
      isFlipImg: 1,      //To hide flip animation pass 0
      CameraScreen_Frame_Color: '#D5323F',  //Pass a Hex Code to change frame color
      CameraScreen_Text_Color: '#FFFFFF',   //Pass a Hex Code to change text color
      CameraScreen_Text_Border_Color: '#000000', //Pass a Hex Code to change text border color
      CameraScreen_Color: '#80000000', //Pass a Hex Code to change Camera Screen Background color
      CameraScreen_Back_Button: 1, //Pass 0 to hide back button in iOS
      CameraScreen_Change_Button: 1, //Pass 0 to hide flip camera button
      CameraScreen_CornerBorder_Enable: false, //To enable corner border frame pass true
      Disable_Card_Name: false, //To disable taking card name automatically pass true
      CameraScreen_Border_Width: 10,
      Disable_Card_Name: false,
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
          console.log(error);
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
   let passArgs = [this.mrzSelected];  //pass other_mrz or passport_mrz or id_mrz or visa_card as String
   //Method for start MRZ scaning from native OS.
   AccurascanKyc.startMRZ(passArgs, (error, response) => {
     if (error != null) {
       console.log(error);
     } else {
       console.log('Success!', response);
     }
   });
};
```

**MRZType:** String

value: other_mrz or passport_mrz or id_mrz or visa_card<br></br>

**Success:** JSON Response {
front_data: JSONObjects?,
back_data: JSONObjects?,
type: Recognition Type,
face: URI?
front_img: URI?
back_img: URI?
}

**Error:** String

## 6.Method for scan OCR documents.

```
onPressOCR = () => {
   let passArgs = [
     // all the values will be provided by the license
     this.countrySelected.id,  //integer
     this.cardSelected.id,     //integer
     this.cardSelected.name,   //String
     this.cardSelected.type,   //integer
   ]; //[{"enableLogs":false},1,41,"Emirates National ID",0,"portrait-primary"]
   //Method for start OCR scaning from native OS.
   AccurascanKyc.startOcrWithCard(passArgs, (error, response) => {
     if (error != null) {
       console.log(error);
     } else {
       console.log('Success!', response);
     }
   });
};
```

**Success:** JSON Response
**Error:** String

## 7.Method for scan barcode.

```
onPressBarcode = () => {
   let passArgs = [this.barcodeSelected];
   //Method for start MRZ scaning from native OS.
   AccurascanKyc.startBarcode(passArgs, (error, response) => {
     if (error != null) {
       console.log(error);
     } else {
       console.log('Success!', response);
     }
   });
};
```

**Success:** JSON Response
**Error:** String

## 8.Method for scan bankcard.

```
onPressBankcard = () => {
 AccurascanKyc.startBankCard((error, response) => {
   if (error != null) {
     console.log(error);
   } else {
      console.log('Success!', response);
   }
 });
};
```

**Success:** JSON Response
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
     console.log(error);
   } else {
     console.log('Success!', response);
   }
 });
};
```

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
     console.log(error);
   } else {
     console.log('Success!', response);
   }
 });
};
```

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
     console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
Image: URI?,
score: String,
}

**Error:** String

Check [App.js](https://github.com/Anaslokhandwala/Accurascan_KYC/blob/master/App.js) for a demo UI

License:
MIT
