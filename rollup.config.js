import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import typescript from "@rollup/plugin-typescript";
import sizes from "rollup-plugin-sizes"
import json from "@rollup/plugin-json";
import {dts} from "rollup-plugin-dts";

const extensions = ['.js', '.ts']

const babelPresetsBrowser = [
    '@babel/preset-typescript',
    ['@babel/preset-env', {
        useBuiltIns: false,
        debug: true
    }]
]
const _babelPresetsNode = [
    '@babel/preset-typescript',
    ['@babel/preset-env', {
        targets: {
            node: '14'
        },
        useBuiltIns: false,
        debug: true
    }]
]
const babelPlugins = [
    ['@babel/plugin-transform-runtime', {
        corejs: {
            version: 3,
            proposals: true
        },
        helpers: true,
        absoluteRuntime: false,
        useESModules: true,
        version: "^7.26.0"
    }]
]

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                format: 'iife',
                name: 'Metapatcher',
                file: 'dist/metapatcher.iife.js',
                sourcemap: true,
                globals: {
                    Metapatcher: 'Metapatcher'
                }
            }
        ],
        plugins: [
            json(),
            typescript({ noForceEmit: true }),
            nodeResolve({ preferBuiltins: false, browser: true, extensions }),
            commonjs({ sourceMap: true }),
            babel({
                extensions,
                //include: ['src/**/*.ts'],
                //exclude: ['node_modules/**'],
                exclude: [/core-js/],
                babelHelpers: 'runtime',
                babelrc: false,
                presets: babelPresetsBrowser,
                plugins: babelPlugins
            }),
            terser({sourceMap: true}),
            sizes()
        ]
    },
    {
        input: 'src/index.ts',
        external: [/@babel\/runtime/],
        output: [
            {
                format: 'es',
                file: 'dist/metapatcher.es.js',
                sourcemap: true
            },
            {
                format: 'cjs',
                file: 'dist/metapatcher.cjs.js',
                sourcemap: true
            }
        ],
        plugins: [
            json(),
            typescript({ noForceEmit: true }),
            nodeResolve({ preferBuiltins: false, browser: true, extensions }),
            commonjs({ sourceMap: true }),
            babel({
                extensions,
                include: ['src/**/*.ts'],
                babelHelpers: 'runtime',
                babelrc: false,
                presets: babelPresetsBrowser,
                plugins: babelPlugins
            }),
            terser({sourceMap: true}),
            sizes()
        ]
    },
    {
        input: "./dist/index.d.ts",
        output: [{ file: "dist/index.d.cts", format: "cjs" }],
        plugins: [dts()],
    }
]
