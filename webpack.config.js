const createExpoWebpackConfigAsync = require("@expo/webpack-config");


module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['react-map-gl'],
    },
  }, argv);
  config.resolve.alias["react-native-maps"] = "react-native-web-maps";
  // Customize the config before returning it.
  return config;
};
