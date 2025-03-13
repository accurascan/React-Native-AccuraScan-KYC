//
//  UIView+ViewExtension.h
//  AccuraOCR
//
//  Created by Technozer on 17/02/21.
//  Copyright © 2021 Technozer. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIView (ViewExtension)
-(void) setShadowToView;

@end

@interface UIImage (imageExtnsion)
-(UIImage*)resizeCI:(CGSize)size;
@end

NS_ASSUME_NONNULL_END
