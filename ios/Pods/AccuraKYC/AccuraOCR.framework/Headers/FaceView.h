//
//  FaceView.h
//  FaceMatch
//
//  Created by Caroll on 3/12/19.
//  Copyright © 2019 Caroll. All rights reserved.
//
#if !TARGET_OS_WATCH
#import <UIKit/UIKit.h>
#import <NSFaceRegion.h>

@interface FaceView : UIView {
    UIImage*    faceImage;
    NSFaceRegion* faceRegion;
}


- (void) setImage:(UIImage*) image;
- (void) setFaceRegion:(NSFaceRegion*) faceRegion;
- (UIImage*) getImage;
- (NSFaceRegion*) getFaceRegion;


@end
#endif
