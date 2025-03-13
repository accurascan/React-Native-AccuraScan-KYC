//
//  LivenessData.h
//  AccuraOCR
//
//  Created by Technozer on 17/02/21.
//  Copyright © 2021 Technozer. All rights reserved.
//

#import <Foundation/Foundation.h>



@protocol LivenessData <NSObject>
-(void) LivenessData:(NSString*)stLivenessValue livenessImage:(UIImage*)livenessImage status:(bool)status;
-(void) livenessViewDisappear;
@end

