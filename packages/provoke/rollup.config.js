import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss'
import path from 'path'
import { defineConfig } from 'rollup';
import { readFileSync } from 'fs';

export default defineConfig(x => {
  const pkg = JSON.parse(readFileSync('./package.json'))
  const external = [
    'react', 'react-dom', 'antd', 'store', 'lodash', 'moment',
    /antd/, /lodash/, /axios/, /zustand/, /@ant/,
    ...Object.keys({ ...pkg.peerDependencies, }),
    ...Object.keys({ ...pkg.dependencies, }),
  ]
  return [
    {
      input: "src/index.ts",

      plugins: [
        postcss({
          plugins: [],
          extract: true,
          modules: true,
        }),
        nodeResolve(),
        commonjs(),
        typescript({
          tsconfig: './tsconfig.json',
          jsx: 'preserve',
          declaration: true,
        }),
        babel({
          presets: ['@babel/preset-react'],
          babelHelpers: 'runtime',
          extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
          plugins: [
            '@babel/plugin-transform-runtime',
            // [
            //   "import",
            //   {
            //     "libraryName": "antd",
            //     "libraryDirectory": "es",
            //     "style": true
            //   }
            // ]
          ],
        })
      ],
      output: {
        dir: path.join(__dirname, 'dist'),
        format: 'esm',
        plugins: [
          getBabelOutputPlugin({
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime'

            ]
          })
        ]
      },
      external

    },

  ]
})





