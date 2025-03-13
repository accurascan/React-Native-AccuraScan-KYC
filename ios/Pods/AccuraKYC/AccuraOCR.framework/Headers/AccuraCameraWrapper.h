//
//  VideoCameraWrapper.h
//  AccuraSDK
//
//  Created by Chang Alex on 1/26/20.
//  Copyright © 2020 Elite Development LLC. All rights reserved.
//
#if !TARGET_OS_WATCH
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "VideoCameraWrapperDelegate.h"
#import "SDKModels.h"
#import <Speech/Speech.h>
#import <Speech/SFSpeechRecognizer.h>
#import "ResultModel.h"

typedef NS_ENUM(NSUInteger, CameraFacing)
{
    CAMERA_FACING_BACK,
    CAMERA_FACING_FRONT
};

typedef NS_ENUM(NSUInteger, CardSide)
{
    BACK_CARD_SCAN,
    FRONT_CARD_SCAN
};

typedef NS_ENUM(NSUInteger, BarcodeType)
{
    ean8,
    ean13,
    pdf417,
    aztec,
    code128,
    code39,
    code93,
    dataMatrix,
    upca,
    itf,
    qrcode,
    upce,
    codabar,
    all
};

typedef NS_ENUM(NSInteger, CardSidetoScan) {
    Front,
    Back,
};

@interface AccuraCameraWrapper : NSObject

{
    CameraFacing Camerafacing;
    CardSide ScanCard;
    BarcodeType barCodeType;
    CardSidetoScan cardSidetoScan;
    BOOL _isCapturing;
    BOOL _isMotion;
    NSThread *thread;
    LivenessType Liveness_Type;
//    SDKModel sdkm;
}


@property (nonatomic, strong) id<VideoCameraWrapperDelegate> delegate;


//@property NSMutableDictionary *ocrDataSet;


- (SDKModels *)loadEngine:(NSString *)url;
- (SDKModels *)loadEngine:(NSString *)path documentDirectory:(NSString *)url;
//-(void)setDefaultDialogs:(bool)isShowErrorDialogs;
- (NSMutableArray *)getOCRList;

@property (nonatomic) SFSpeechRecognizer *speechRecognizer;
@property (nonatomic) SFSpeechAudioBufferRecognitionRequest *recognitionRequest;
@property (nonatomic) SFSpeechRecognitionTask *recognitionTask;
@property (nonatomic) AVAudioEngine *audioEngine;
@property (nonatomic) AVAudioInputNode *inputNode;

-(id)initWithDelegate:(UIViewController<VideoCameraWrapperDelegate>*)delegate andImageView:(UIImageView *)iv andLabelMsg:(UILabel*)l andurl:(NSString*)url cardId:(int)cardId countryID:(int)countryID isScanOCR:(bool)isScanOCR andcardName:(NSString*)cardName andcardType:(int)cardType andMRZDocType:(int)MRZDocumentType;
-(id)initWithDelegate:(UIViewController<VideoCameraWrapperDelegate>*)delegate andImageView:(UIImageView *)iv andLabelMsg:(UILabel*)l andurl:(int)url  isBarcodeEnable:(bool)isBE countryID:(int)countryID setBarcodeType:(BarcodeType)setBarcodeType;

//-(id)initWithDelegate:(UIViewController<VideoCameraWrapperDelegate>*)delegate;
-(id)initWithDelegate:(UIViewController<VideoCameraWrapperDelegate>*)delegate cardId:(int)cardId countryID:(int)countryID isScanOCR:(bool)isScanOCR andcardName:(NSString*)cardName andcardType:(int)cardType;

-(id)initWithDelegate:(UIViewController<VideoCameraWrapperDelegate>*)delegate andImageView:(UIImageView *)iv andMsgLabel:(UILabel*)l andfeedBackframeMessage:(NSString*)feedBackframeMessage andfeedBackAwayMessage:(NSString*)feedBackAwayMessage andfeedBackOpenEyesMessage:(NSString*)feedBackOpenEyesMessage andfeedBackCloserMessage:(NSString*)feedBackCloserMessage andfeedBackCenterMessage:(NSString*)feedBackCenterMessage andfeedBackMultipleFaceMessage:(NSString*)feedBackMultipleFaceMessage andfeedBackFaceSteady:(NSString*)feedBackFaceSteady andfeedBackLowLightMessage:(NSString*)feedBackLowLightMessage andfeedBackBlurFaceMessage:(NSString*)feedBackBlurFaceMessage andfeedBackGlareFaceMessage:(NSString*)feedBackGlareFaceMessage andfeedBackVideoRecordingMessage:(NSString*)feedBackVideoRecordingMessage andcheckLivess:(bool)checkLivenss labelLvienessProcess:(UILabel*)lbllivenessProcess recordingMessage:(NSString*)recordingMessage labelRecordingMSG:(UILabel*)labelRecordingMSG feedbackFMFailMessage:(NSString *)feedBackFMFailMessage andfeedBackLookLeftMessage:(NSString *)feedBackLookLeftMessage andfeedBackLookRightMessage:(NSString *)feedBackLookRightMessage andFaceInsideOvalMessage:(NSString *)FaceInsideOvalMessage andfeedBackOralInfoMessage:(NSString*)feedBackOralInfoMessage andfeedBackProcessingMessage:(NSString*)feedBackProcessingMessage;

-(void)startCamera;
-(void)stopCamera;
-(void)stopCameraPreview;
-(void)startCameraPreview;
-(void)ChangedOrintation:(CGFloat)width height:(CGFloat)height;

-(void)processWithArray:(NSArray*)imageDataArray andarrTextData:(NSArray*)ad;

-(void)processWithBack1:(NSString*)stCard  andisCheckBack:(bool)isCheckBack;
-(void)drawFeatures:(UIImage *)image11;
-(void)setHologramDetection:(BOOL)hologram;
-(void)setFaceBlurPercentage:(int)faceBlur;
-(void)setLowLightTolerance:(int)lowLight;
-(void)setMotionThreshold:(int)motion;
-(void)setGlarePercentage:(int)intMin intMax:(int)intMax;
-(void)setCheckPhotoCopy:(BOOL)isPhoto;
-(void)setLivenessGlarePercentage:(int)glareMin glareMax:(int)glareMax;
-(void)setLivenessBlurPercentage:(int)blur;
-(void)setMinFrameForValidate:(int)minFrame;
//-(void)accuraSDK;
-(void)SetCameraFacing:(CameraFacing)camera;
-(void)SwitchCamera;
-(void)setBlurPercentage:(int)blur;
-(void)CardSide:(CardSide)scanCardFirst;
//-(void)showLogFile:(bool)isShowLogs;
-(void)changeBarcodeType:(BarcodeType)barcodetype;
-(void)CloseOCR;
-(NSString *)getSDKVersion;
-(void)getMRZDetails:(UIImage *)image isFace:(bool)isFace;
-(void)getOCRDetails:(UIImage *)image isBack:(CardSidetoScan)side;
-(bool)isBackSideAvailable;
-(void)APIKEY:(NSString *)apiKey;
-(void)isApiCallingEnable:(BOOL)isApiCallingEnable1;
-(void)hideProgressDialogue:(BOOL)isHidden;
-(void)APIURL:(NSString *)apiurl;
-(void)APIHEADER:(NSDictionary *)apiHeader;
-(void)APITimer:(float)apitimer;
-(void)setProgressDialogue:(NSString *)loading;
-(void)startSpeechRecording;
-(void)stopRecording1;

@end
#endif
