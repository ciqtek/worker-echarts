/*
 * @Author: your name
 * @Date: 2021-07-26 09:40:28
 * @LastEditTime: 2021-07-27 15:35:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \qmc-libs\test\jest.test.js
 */
import WorkerEcharts from "../dist/index.umd.js"

if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: function () { } })
}
describe('WorkerEcharts', () => {
  test('WorkerEcharts', () => {
    console.log(new WorkerEcharts())
  })
})