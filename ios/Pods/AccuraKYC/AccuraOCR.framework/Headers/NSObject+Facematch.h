//
//  NSObject+Facematch.h
//  AccuraOCR
//
//  Created by Technozer on 17/02/21.
//  Copyright © 2021 Technozer. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "LivenessVC.h"
#import "NSObject+userDefaults.h"

NS_ASSUME_NONNULL_BEGIN

@interface Facematch : NSObject

-(void) setFacematch:(UIViewController*)FacematchView;


-(void)setBackGroundColor:(NSString*)backGroundColor;

-(void) setCloseIconColor:(NSString*)closeIconColor;

-(void)setFeedbackBackGroundColor:(NSString*)feedbackBackGroundColor;

-(void) setFeedbackTextColor:(NSString*)feedbackTextColor;

-(void) setFeedbackTextSize:(float)feedbackTextSize;

-(void) setFeedBackframeMessage:(NSString*)feedBackframeMessage;

-(void) setFeedBackAwayMessage:(NSString*)feedBackAwayMessage;

-(void) setFeedBackOpenEyesMessage:(NSString*)feedBackOpenEyesMessage;

-(void) setFeedBackCloserMessage:(NSString*)feedBackCloserMessage;

-(void) setFeedBackCenterMessage:(NSString*)feedBackCenterMessage;

-(void) setFeedbackMultipleFaceMessage:(NSString*)feedBackMultipleFaceMessage;

-(void) setFeedBackFaceSteadymessage:(NSString*)feedBackFaceSteadymessage;
       
-(void) setFeedBackLowLightMessage:(NSString*)feedBackLowLightMessage;

-(void) setFeedBackBlurFaceMessage:(NSString*)feedBackBlurFaceMessage;
-(void) setFeedBackGlareFaceMessage:(NSString*)feedBackGlareFaceMessage;

-(void) setBlurPercentage:(int)blurPercentage;
-(void) setDefaultText:(NSString*)defaultText;
-(void) hideLogo:(bool)isLogoHidden;
-(void) setGlarePercentage:(int) glaremin :(int) glareMax;

@end

NS_ASSUME_NONNULL_END
