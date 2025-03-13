//
//  NSObject+userDefaults.h
//  AccuraOCR
//
//  Created by Technozer on 17/02/21.
//  Copyright © 2021 Technozer. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface userDefaults : NSObject

-(void)setLivenessData: (NSString*)livenessData key:(NSString*)key;
-(NSString*)getLivenessData:(NSString*)key;
-(UIColor *)colorFromHexString:(NSString *)hexString;
@end

NS_ASSUME_NONNULL_END
