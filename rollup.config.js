const {nodeResolve} = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('@rollup/plugin-json')
const {terser} = require('rollup-plugin-terser')

const suffix = process.env.USE_POLYFILLS == 'on' ? '.polyfilled' : ''

module.exports = {
  external: [
    'basekits', 'dom-scripter'
  ],
  input: 'src/index.js',
  output: [
    {
      exports: 'default',
      format: 'amd',
      file: 'dist/metapatcher.amd' + suffix + '.js'
    },
    {
      exports: 'default',
      format: 'cjs',
      file: 'dist/metapatcher.cjs' + suffix + '.js'
    },
    {
      exports: 'default',
      format: 'es',
      file: 'dist/metapatcher.es' + suffix + '.js'
    },
    {
      exports: 'default',
      format: 'iife',
      file: 'dist/metapatcher.iife' + suffix + '.js',
      name: 'Metapatcher',
      globals: {
        'basekits': 'Basekits',
        'dom-scripter': 'DOMScripter'
      }
    },
    {
      exports: 'default',
      format: 'umd',
      file: 'dist/metapatcher.umd' + suffix + '.js',
      name: 'Metapatcher',
      globals: {
        'basekits': 'Basekits',
        'dom-scripter': 'DOMScripter'
      }
    }
  ],
  plugins: [
    nodeResolve({browser: true}),
    commonjs(),
    babel(),
    json(),
    terser()
  ]
}
