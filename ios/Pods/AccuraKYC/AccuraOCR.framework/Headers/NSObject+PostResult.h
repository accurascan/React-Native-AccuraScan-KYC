//
//  NSObject+PostResult.h
//  AccuraOCR
//
//  Created by Technozer on 18/02/21.
//  Copyright © 2021 Technozer. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>




@interface PostResult: NSObject

typedef void (^SuccessBlock)(NSMutableDictionary* Response);
typedef void (^FailureBlock)(NSError* error);
typedef void (^ProgressBlock)(NSMutableDictionary*);


- (void)postMethodWithParamsAndImage:(NSMutableDictionary *)parameters
                            forMethod:(NSString *)forMethod
                                image:(UIImage *)image
                                apikey:(NSString *)apikey
                           apiMethod:(NSString *)apiMethod
                           completion:(void (^)(NSMutableDictionary *tagText))completion
                        FailureBlock:(FailureBlock)FailureBlock;
@end


