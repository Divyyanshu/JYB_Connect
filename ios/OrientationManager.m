//
//  OrientationManager.m
//  JawaAudit
//
//  Created by Purushotam Baheti on 18/04/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(OrientationManager, NSObject)

RCT_EXTERN_METHOD(lockToLandscape)
RCT_EXTERN_METHOD(lockToPortrait)

@end
