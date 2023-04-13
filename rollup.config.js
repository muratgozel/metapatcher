import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'

const babelPresetsStandart = [
    ['@babel/env', {
        useBuiltIns: false,
        debug: false
    }]
]
const babelPresetsIife = [
    ['@babel/env', {
        useBuiltIns: 'usage',
        corejs: {version: 3, proposals: true},
        debug: false
    }]
]
const babelPlugins = [
    ['@babel/plugin-transform-runtime', {
        corejs: {version: 3, proposals: true},
        helpers: true,
        regenerator: true,
        absoluteRuntime: false
    }]
]

export default [
    {
        external: [
            /@babel\/runtime/, /core-js/, /dom-scripter/
        ],
        input: 'build/index.js',
        output: [
            {
                format: 'cjs',
                file: 'dist/browser/cjs/index.js',
                sourcemap: true
            },
            {
                format: 'es',
                file: 'dist/browser/es/index.js',
                sourcemap: true
            }
        ],
        plugins: [
            json(),
            nodeResolve({preferBuiltins: false}),
            commonjs({sourceMap: true}),
            babel({
                babelHelpers: 'runtime',
                babelrc: false,
                exclude: ['node_modules/**'],
                presets: babelPresetsStandart,
                plugins: babelPlugins
            })
        ]
    },
    {
        input: 'build/index.js',
        output: [
            {
                format: 'iife',
                name: 'metapatcher',
                file: 'dist/browser/iife/index.js',
                sourcemap: true,
                globals: {
                    metapatcher: 'metapatcher'
                }
            }
        ],
        plugins: [
            json(),
            nodeResolve({preferBuiltins: false}),
            commonjs({sourceMap: true}),
            babel({
                babelHelpers: 'runtime',
                babelrc: false,
                exclude: ['node_modules/**'],
                presets: babelPresetsIife,
                plugins: babelPlugins
            }),
            terser({sourceMap: true})
        ]
    }
]
