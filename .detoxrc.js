/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/detoxexpobarefirebaserepro.app',
      build: 'xcodebuild -workspace ios/detoxexpobarefirebaserepro.xcworkspace -scheme detoxexpobarefirebaserepro -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14'
      }
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_4'
      }
    }
  },
  configurations: {
    'ios.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};
