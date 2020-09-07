cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-camera.Camera",
    "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "Camera"
    ]
  },
  {
    "id": "cordova-plugin-camera.CameraPopoverOptions",
    "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "CameraPopoverOptions"
    ]
  },
  {
    "id": "cordova-plugin-camera.camera",
    "file": "plugins/cordova-plugin-camera/www/Camera.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "navigator.camera"
    ]
  },
  {
    "id": "cordova-plugin-camera.CameraPopoverHandle",
    "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "CameraPopoverHandle"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-facebook.CordovaFacebook",
    "file": "plugins/cordova-plugin-facebook/www/CordovaFacebook.js",
    "pluginId": "cordova-plugin-facebook",
    "clobbers": [
      "CordovaFacebook"
    ]
  },
  {
    "id": "cordova-plugin-googleplus.GooglePlus",
    "file": "plugins/cordova-plugin-googleplus/www/GooglePlus.js",
    "pluginId": "cordova-plugin-googleplus",
    "clobbers": [
      "window.plugins.googleplus"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.Coordinates",
    "file": "plugins/org.apache.cordova.geolocation/www/Coordinates.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "Coordinates"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.PositionError",
    "file": "plugins/org.apache.cordova.geolocation/www/PositionError.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "PositionError"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.Position",
    "file": "plugins/org.apache.cordova.geolocation/www/Position.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "Position"
    ]
  },
  {
    "id": "org.apache.cordova.geolocation.geolocation",
    "file": "plugins/org.apache.cordova.geolocation/www/geolocation.js",
    "pluginId": "org.apache.cordova.geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-camera": "4.0.3",
  "cordova-plugin-splashscreen": "5.0.4",
  "cordova-plugin-facebook": "0.2.2",
  "cordova-plugin-googleplus": "8.5.0",
  "org.apache.cordova.geolocation": "0.3.6"
};
// BOTTOM OF METADATA
});