//
//  AccuraOCR.h
//  AccuraOCR
//
//  Created by Technozer on 17/05/20.
//  Copyright © 2020 Technozer. All rights reserved.
//
#if !TARGET_OS_WATCH
#import <Foundation/Foundation.h>

//! Project version number for AccuraOCR.
FOUNDATION_EXPORT double AccuraOCRVersionNumber;

//! Project version string for AccuraOCR.
FOUNDATION_EXPORT const unsigned char AccuraOCRVersionString[];

#import <AccuraOCR/GlobalMethods.h>
#import <AccuraOCR/VideoCameraWrapperDelegate.h>
#import <AccuraOCR/AccuraCameraWrapper.h>
#import <AccuraOCR/SDKModels.h>
#import <AccuraOCR/LivenessData.h>
#import <AccuraOCR/FacematchData.h>
#import <AccuraOCR/NSObject+Facematch.h>
#import <AccuraOCR/NSObject+Liveness.h>
#import <AccuraOCR/NSObject+Constant.h>
#import "NSFaceRegion.h"
#import <AccuraOCR/EngineWrapper.h>
#endif


// In this header, you should import all the public headers of your framework using statements like #import <AccuraOCR/PublicHeader.h>


