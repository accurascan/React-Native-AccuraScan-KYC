//
//  ResultModel.h
//  AccuraOCR
//
//  Created by Apple on 07/08/20.
//  Copyright © 2020 Technozer. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ResultModel : NSObject


@property UIImage *frontSideImage;
@property UIImage *backSideImage;
@property UIImage *faceImage;


@property NSMutableDictionary *ocrFaceFrontData;
@property NSMutableDictionary *ocrSecurityData;
@property NSMutableDictionary *ocrFaceBackData;
@property NSMutableDictionary *ocrTypeData;
@property NSMutableDictionary *ocrTypeBackData;

@property NSMutableArray *arrayocrFrontSideDataKey;
@property NSMutableArray *arrayocrFrontSideDataValue;
@property NSMutableArray *arrayocrBackSideDataKey;
@property NSMutableArray *arrayocrBackSideDataValue;
@property NSMutableDictionary *shareScanningMRZListing;




@end

NS_ASSUME_NONNULL_END
