//
//  LivenessVC.h
//  AccuraOCR
//
//  Created by Technozer on 17/02/21.
//  Copyright © 2021 Technozer. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
//#import "AccuraCameraWrapper.h"
#import "UIView+ViewExtension.h"
#import "UIView+customView.h"
#import "NSObject+userDefaults.h"
#import "LivenessData.h"
#import "NSObject+PostResult.h"
#import "NSObject+Facematch.h"
#import "FacematchData.h"
#import "NSObject+Liveness.h"


NS_ASSUME_NONNULL_BEGIN

@interface LivenessVC : UIViewController

@property (weak, nonatomic) IBOutlet UIView *viewLiveness;
@property (weak, nonatomic) IBOutlet UIButton *buttonBack;
@property (weak, nonatomic) IBOutlet UILabel *lblOCRMsg;
@property (weak, nonatomic) IBOutlet UIView *viewSetLOGO;
@property (weak, nonatomic) IBOutlet UIView *viewLogo;
@property (weak, nonatomic) IBOutlet UIView *viewTitleLable;
@property (weak, nonatomic) IBOutlet UILabel *labelTitle;
@property (weak, nonatomic) IBOutlet UIImageView *imgView;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *_constant_height;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *_constant_width;
@property (weak, nonatomic) IBOutlet UILabel *labelSec;
@property (weak, nonatomic) IBOutlet UILabel *labelFaceSteadyMSG;
@property (weak, nonatomic) IBOutlet UIButton *buttonMic;
@property (weak, nonatomic) IBOutlet UILabel *labelRandomNumber;
@property (weak, nonatomic) IBOutlet UIImageView *arrowImage;

@property (nonatomic, strong) id<LivenessData> delegate;
@property (nonatomic, strong) id<FacematchData> delegateFacematch;
@property (nonatomic, assign) bool ischeckLiveness;
@property (weak, nonatomic) IBOutlet UILabel *defaultLabel;


@end

NS_ASSUME_NONNULL_END
