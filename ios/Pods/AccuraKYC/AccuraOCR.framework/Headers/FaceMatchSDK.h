//
//  FaceMatchSDK.h
//  FaceMatchSDK
//
//  Created by Technozer on 15/06/20.
//  Copyright © 2020 Technozer. All rights reserved.
//
#if !TARGET_OS_WATCH
#import <Foundation/Foundation.h>

//! Project version number for FaceMatchSDK.
FOUNDATION_EXPORT double FaceMatchSDKVersionNumber;

//! Project version string for FaceMatchSDK.
FOUNDATION_EXPORT const unsigned char FaceMatchSDKVersionString[];

// In this header, you should import all the public headers of your framework using statements like #import <FaceMatchSDK/PublicHeader.h>
#import <AudioToolbox/AudioToolbox.h>
#import <MessageUI/MessageUI.h>
#import "GlobalMethods.h"
#import "EngineWrapper.h"
#import "NSFaceRegion.h"
#import "FaceView.h"
#import "ImageHelper.h"

#endif

