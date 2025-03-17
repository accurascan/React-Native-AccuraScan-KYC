# React Native Accura Scan MICR

## Note:-

`yarn add 'react-native-accurascan-micr'`

OR

`npm i react-native-accurascan-micr`

**Usage**
Import npm library into file.
`import AccurascanMICR from 'react-native-accurascan-micr';`

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
    ...
    reset()
    include 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
  }
}
```

## 2.Setup iOS

1.Install Git LFS using command install `git-lfs`

2.Add the following in your podfile
`use_frameworks!` below `prepare_react_native_project!`

take reference from [here](https://github.com/Anaslokhandwala/Accurascan_KYC/blob/master/ios/Podfile)

3.Run `pod install`

**Add this permissions into iOS Info.plist file.**

```
<key>NSCameraUsageDescription</key>
<string>App usage camera for scan documents.</string>
```

## 3.Setup Accura Scan licenses into your projects

Accura Scan has two license require for use full functionality of this library. Generate your own Accura license from [here](https://accurascan.com/developer/dashboard) using your bundle id.

**key.license**

This license is compulsory for this library to work. it will get all setup of accura SDK.

**For Android**

```
Create "assets" folder under app/src/main and Add license file in to assets folder.
- key.license // for Accura Scan OCR
```

**For iOS**

```
Place the license in your project's Runner directory, and add the licenses to the target.
```

## 4.Get license configuration from SDK. It returns all active functionalities of your license.

### Setting up License

```
  getAccuraSetup = () => {
    //Method for get license info from native OS.
    AccurascanOcr.getMetaData((error, response) => {
      if (error != null) {

      } else {
        console.log(response);
      }
    });
  };
```

**Error:** String

**Success:** JSON String Response = {
isValid: boolean,
isMICR:boolean
}

### Setting up Configuration's,Error mssages and Scaning title messages

```
   setUpCustomMessages = () => {
      var config = {
        setMinGlarePercentage: 6,
        setMaxGlarePercentage: 99,
        setBlurPercentage: 60,
      };
  
      var accuraConfigs = {
        CameraScreen_CornerBorder_Enable: true,
        CameraScreen_Border_Width: 15,
        Disable_Card_Name: false,
        enableLogs: 0,
        setCameraFacing: 0,
        isShowLogo: 1,
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
        ACCURA_ERROR_CODE_GLARE_DOCUMENT: 'Glare detect in document',
        ACCURA_ERROR_CODE_DARK_DOCUMENT: 'Low lighting detected',
        ACCURA_ERROR_CODE_MOVE_CLOSER: "Move closer to document",
        ACCURA_ERROR_CODE_MOVE_AWAY:"Move away from document",
        ACCURA_ERROR_CODE_KEEP_MICR_IN_FRAME: "Keep MICR in frame",
      };
  
      var accuraTitleMsg = {
        SCAN_TITLE_MICR: 'Scan Cheque',

      };
  
      //Method for setup config into native OS.
      AccurascanOcr.setupAccuraConfig(
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
```

## 5.Method for scan MICR documents.

```
onPressMICR = () => {
   let passArgs = [ micrSelected]; //e13b or cmc7
   //Method for start MICR scaning from native OS.
   AccurascanOcr.startMRZ(passArgs, (error, response) => {
     if (error != null) {
       console.log('Failure!', error);
        showAlert('Failure!', error);
     } else {
       console.log('Success!', response);
     }
   });
};
```

**MICRType:** String

#### value: e13b or cmc7<br></br>

**Success:** JSON Response {
front_data: JSONObjects?,
front_img: URI?
}

**Error:** String

Contributing
See the contributing guide to learn how to contribute to the repository and the development workflow.

License:
MIT
