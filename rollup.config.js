import commonjs from '@rollup/plugin-commonjs'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import sucrase from '@rollup/plugin-sucrase'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import visualizer from 'rollup-plugin-visualizer'

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
  external: ['prop-types', 'react-quill'],
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
  plugins: plugins.concat([visualizer({ filename: 'stats/cjs.html' })])
}

const esmConfig = {
  input: 'index.js',
  external: ['prop-types', 'react-quill'],
  output: [
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: plugins.concat([visualizer({ filename: 'stats/esm.html' })])
}

const umdOutputGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-dom/server': 'ReactDOMServer',
  'prop-types': 'PropTypes',
  'react-quill': 'ReactQuill'
}
const umdOutputPlugins = [
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
const umdConfigs = [
  'Checkbox',
  'Form',
  'Input',
  'Select',
  'Textarea',
  'Wysiwyg'
]
  .map(filename => {
    const createConfig = filename => ({
      input: `src/${filename}.jsx`,
      external: ['prop-types', 'react-quill'],
      output: [
        {
          file: `dist/preaction-inputs.${filename.toLowerCase()}.umd.js`,
          format: 'umd',
          globals: umdOutputGlobals,
          sourcemap: true,
          name: `@preaction/inputs-${filename.toLowerCase()}`,
          plugins: umdOutputPlugins
        }
      ],
      plugins: plugins.concat([
        visualizer({ filename: `stats/${filename.toLowerCase()}.umd.html` })
      ])
    })
    return createConfig(filename)
  })
  .concat([
    {
      input: 'index.js',
      external: ['prop-types', 'react-quill'],
      output: [
        {
          file: 'dist/preaction-inputs.umd.js',
          format: 'umd',
          globals: umdOutputGlobals,
          sourcemap: true,
          name: '@preaction/inputs',
          plugins: umdOutputPlugins
        }
      ],
      plugins: plugins.concat([visualizer({ filename: 'stats/umd.html' })])
    }
  ])

export default [esmConfig, cjsConfig, ...umdConfigs]
