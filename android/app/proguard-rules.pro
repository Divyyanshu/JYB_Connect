# Camera and Image Picker Libraries ke liye ProGuard Rules

-keep class com.google.android.cameraview.** { *; }
-keep class com.facebook.react.modules.camera.** { *; }
-keep class com.yourcamera.package.** { *; }
-keep class com.imagepicker.** { *; }
-keep class com.reactnative.ivpusic.imagepicker.** { *; }

# Prevent stripping of classes
-keep class androidx.camera.** { *; }
-keep class com.otaliastudios.cameraview.** { *; }

# Keep native modules
-keep class com.facebook.react.bridge.ReactMethod { *; }
-keep class com.facebook.react.bridge.ReactApplicationContext { *; }
-keep class com.facebook.react.uimanager.** { *; }

# Ensure reflection is not stripped
-dontwarn com.facebook.react.**
-dontwarn com.google.android.cameraview.**
-dontwarn androidx.camera.**

# Keep classes for Glide (if used for image loading)
-keep class com.bumptech.glide.** { *; }
