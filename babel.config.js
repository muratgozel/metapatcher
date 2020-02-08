module.exports = function(api) {
  const env = api.env()

  const envPresetOpts = {
    useBuiltIns: env == 'development' ? false : 'usage',
    corejs: {version: 3, proposals: true},
    debug: true
  }
  const minifyPresetOpts = {builtIns: false}

  const presets = [
    ["@babel/env", envPresetOpts],
    ['minify', minifyPresetOpts]
  ]

  return {
    presets: presets,
    plugins: []
  }
}
