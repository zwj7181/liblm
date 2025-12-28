import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import jsx from 'acorn-jsx';
import postcss from 'rollup-plugin-postcss'
import path from 'path'
export default {
  input: "src/index.ts",
  acornInjectPlugins: [jsx()],

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
      sourceMap: true,

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
  external: ['react', 'axios', 'store', 'moment', 'dayjs', 'axios', '@lm_fe/utils', '@lm_fe/env', 'lodash', /antd/, /lodash/] // 增加了这一行。
}





