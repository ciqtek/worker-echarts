


declare type Indicator = {
  type: String,
  listener(): void
}

declare type chartDataZoomOptions = {
  type: String
  // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
  dataZoomIndex: Number,
  // 开始位置的百分比，0 - 100
  start: Number,
  // 结束位置的百分比，0 - 100
  end: Number,
  // 开始位置的数值
  startValue: Number,
  // 结束位置的数值
  endValue: Number
}
declare type messageOptions = {
  type: String,
  args: Array<any>
}
export declare class WorkerECharts {
  /**
   *
   * Worker 实例
   * @type {Worker}
   * @memberof WorkerECharts
   */
  _worker: Worker

  //dom Object
  _eventTarget: HTMLDocument

  //events maps
  _eventsMap: Object

  //promise
  _promise: Promise<null>

  /**
   * register theme
   * @param name {String} - light or dark
   * @param theme {object}options
   */
  registerTheme(name: String, theme: Object): void

  /**
   * 重置横坐标单位
   * @param {number} point 
   */
  resizeAxisUnit(point: Number): void


  /**
   * 绑定事件
   * @param type type
   * @param listener listener function
   * @param isMust 是否必须监听
   */
  on(type: String, listener: void, isMust: Boolean): void

  /**
   * 解绑
   * @param indicator 
   */
  off(indicator: Indicator): void

  /**
   * 初始化
   * @param div 
   * @param theme 
   */
  init(div: HTMLDocument | HTMLCanvasElement, theme: Object | String): void

  /**
   * 
   * @param methodName echart's methodname  resize
   * @param args 
   * @returns 
   */
  callMethod(methodName: String, args: Object): void

  /**
   * 
   * @param Option //echart options对象
   * @param args 
   */
  setOption(option: Object, args: {
    notMerge?: boolean;
    replaceMerge?: String | String[];
    lazyUpdate?: boolean;
  }): void

  /**
   * @return 获取当前echart options
   */
  getOption(): void

  /**
   * @return 坐标轴数据
   */
  getAxisGrid(): void

  /**
  * @return x轴刻度
  */
  getEchartXInterval(): void

  /**
   * @return y轴刻度
   */
  getEchartYInterval(): void

  /**
   * 启动或关闭 toolbox 中 dataZoom 的刷选状态。
   * @returns promise对象
   */
  enlargeZoom(): void

  /**
   *  重置坐标轴
   */
  restoreZoom(): void

  /**
   *  数据区域缩放。
   * @param params 
   * @returns 
   */
  chartDataZoom(params: chartDataZoomOptions): void

  /**
   * 调用echart的dispatchAction方法
   * @param payload options
   * @returns 
   */
  dispatchAction(payload: Object): void

  /**
   * 调用echart的resize方法
   * @param opts options
   * @returns 
   */
  resize(opts?: Object): void

  /**
 * 调用echart的echart方法
 * @param opts options
 * @returns 
 */
  clean(): void

  /**
   * 关闭worker
   */
  dispose(): void

  /**
   *  Post message into worker thread; returned promise is resolved when get message back
   * @param message 
   * @param transfer 
   * @returns 
   */
  postMessage(message: messageOptions): void
}