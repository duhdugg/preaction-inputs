import commonjs from '@rollup/plugin-commonjs'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import sucrase from '@rollup/plugin-sucrase'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const plugins = [
  external(),
  nodeResolve(),
  postcss({}),
  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['jsx']
  }),
  commonjs(),
  terser({
    output: {
      comments: 'all'
    }
  })
]

const cjsConfig = {
  input: 'index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      plugins: [
        getBabelOutputPlugin({
          compact: true,
          presets: [
            [
              '@babel/preset-env',
              {
                modules: 'cjs',
                targets: 'maintained node versions'
              }
            ]
          ]
        })
      ]
    }
  ],
  plugins
}

const esmConfig = {
  input: 'index.js',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins
}

const umdConfigs = [
  'Checkbox',
  'Form',
  'Input',
  'Select',
  'Textarea',
  'Wysiwyg'
].map(filename => {
  const createConfig = filename => ({
    input: `src/${filename}.jsx`,
    output: [
      {
        file: `dist/preaction-inputs.${filename.toLowerCase()}.umd.js`,
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/server': 'ReactDOMServer',
          'prop-types': 'PropTypes'
        },
        sourcemap: true,
        name: `@preaction/inputs-${filename.toLowerCase()}`,
        plugins: [
          getBabelOutputPlugin({
            allowAllFormats: true,
            compact: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: 'umd',
                  targets: 'defaults'
                }
              ]
            ]
          })
        ]
      }
    ],
    plugins
  })
  return createConfig(filename)
})

export default [esmConfig, cjsConfig, ...umdConfigs]
