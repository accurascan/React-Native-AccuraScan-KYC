//
//  EngineWrapper.h
//  FaceMatch

#if !TARGET_OS_WATCH
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "ImageHelper.h"
#import "NSFaceRegion.h"

@class NSFaceRegion;

@interface EngineWrapper : NSObject

+(void) FaceEngineInit;
+(void) FaceEngineInit:(NSString *)licensePath;
+(BOOL) IsEngineInit;
+(int) GetEngineInitValue;
+(void) FaceEngineClose;
+(NSFaceRegion*) DetectSourceFaces:(UIImage*) image;
+(NSFaceRegion*) DetectTargetFaces:(UIImage*) image feature1:(NSData*) feature1;
+(double) Identify:(NSData*)pbuff1 featurebuff2:(NSData*)pbuff2;

@end
#endif
