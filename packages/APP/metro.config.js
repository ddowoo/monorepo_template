/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const exclusionList = require("metro-config/src/defaults/exclusionList");
const { getMetroTools, getMetroAndroidAssetsResolutionFix } = require("react-native-monorepo-tools");

const monorepoMetroTools = getMetroTools();

const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: monorepoMetroTools.watchFolders,
  resolver: {
    // unstable_enableSymlinks: true,
    // blockList: exclusionList(monorepoMetroTools.blockList),
    // extraNodeModules: monorepoMetroTools.extraNodeModules,
  },
};
