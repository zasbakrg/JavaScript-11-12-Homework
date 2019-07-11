const webpackMerge = require('webpack-merge');
const loadSharedConfig = require('./configs/main.config');

const loadModeConfig = env => require(`./configs/${env.mode}.config`)(env);

module.exports = env =>
  webpackMerge(loadSharedConfig(env), loadModeConfig(env));
