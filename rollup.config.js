/*
 * @Author: your name
 * @Date: 2021-07-22 17:28:44
 * @LastEditTime: 2021-07-27 17:50:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Electron-Basic-Library\build\rollup.config.dev.js
 */
const path = require('path');
import { babel } from '@rollup/plugin-babel'
import webWorker from "rollup-plugin-web-worker-loader"
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs"
import { terser } from 'rollup-plugin-terser';
import json from "@rollup/plugin-json"


// 返回文件的绝对路径
const resolveFile = function (filename) {
  return path.join(__dirname, filename);
}
let plugins = [
  json(),
  commonjs(),
  resolve(),
  //nodePlugins
  terser(),
  webWorker({
    targetPlatform: "browser" //转成浏览器支持
  }),

  babel(
    {
      babelrc: false,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', {
        "modules": false,
      }]],
      plugins: [["@babel/transform-runtime", { regenerator: true }]],
      babelHelpers: 'runtime',
      extensions: ['js', 'ts'],
    }
  )
];
const rollupConfig = {
  input: resolveFile("src/index.js"),
  output: {
    file: resolveFile(`dist/index.umd.js`),
    format: 'umd',
    name: `index.umd.js`,
  },
  plugins
}
module.exports = rollupConfig
