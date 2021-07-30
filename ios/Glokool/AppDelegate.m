#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>
#import "RNPaypal.h"
#import <GoogleMaps/GoogleMaps.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h> // <- Add This Import
#import <React/RCTLinkingManager.h> // <- Add This Import

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>


// - (BOOL)application:(UIApplication *)app
//             openURL:(NSURL *)url
//             options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
// {
//   if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
//     return YES;
//   }

//   if ([RCTLinkingManager application:app openURL:url options:options]) {
//     return YES;
//   }

//   return NO;
// }

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(nonnull NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
//  [[FBSDKApplicationDelegate sharedInstance] application:application
//                                                 openURL:url
//                                                 options:options];
////linking ----->
//   if ([RCTLinkingManager application:application openURL:url sourceApplication:nil annotation:nil]) {
//    return YES;
//  }
//
//  return YES;
  return [RCTLinkingManager application:application openURL:url options:options];
}


static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FBSDKApplicationDelegate initializeSDK:launchOptions]; // <- add this
  [GMSServices provideAPIKey:@"AIzaSyCRMnPLQDqrELKLx5kAkX3zXSmC6ZVZgxA"];
  
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  
  [[RNPaypal sharedInstance] configure];
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Glokool"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


@end
