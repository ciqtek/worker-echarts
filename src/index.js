import { stringify } from './save-json'
import MyWorker from "web-worker:./index.worker"
function copyByKeys (data, keys) {
  const result = {}
  keys.forEach(x => {
    if (x in data) { result[x] = data[x] }
  })
  return result
}
const mouseEventKeys = [
  'clientX', 'clientY', 'offsetX', 'offsetY',
  'button', 'which', 'wheelDelta', 'detail'
]
const mouseEventNames = [
  'click', 'dblclick', 'mousewheel', 'mouseout',
  'mouseup', 'mousedown', 'contextmenu'
]

/**
 * @description WorkerEcharts Class
 */
class WorkerECharts {
  constructor () {
    this._worker = new MyWorker();
    this._eventTarget = document.createDocumentFragment()
    this._eventsMap = {}
    this._promise = Promise.resolve(undefined)
    //this._worker.postMessage({ type: "window", args: window })
    this._worker.addEventListener('message', e => {
      console.assert(Array.isArray(e.data), 'Unknown message type posted: ', e)
      const [msgType, data] = e.data
      switch (msgType) {
        case 'event': {
          const { type } = data
          delete data.type
          console.log('type', type, data)
          this._eventTarget.dispatchEvent(Object.assign(new Event(type), data))
          break
        }
        case 'open': {
          open(...data)
          break
        }
        case 'saveAsImage': {
          const $a = document.createElement('a')
          $a.download = `${data.title}.${data.type}`
          $a.target = '_blank'
          $a.href = this._canvas.toDataURL('image/' + data.type)
          $a.click()
          break
        }
        case 'tooltip': {
          const { type, param } = data
          switch (type) {
            case 'init': {
              const container = this._canvas.parentElement
              const div = this._tooltip = document.createElement('div')
              const appendToBody = param.appendToBody
              Object.assign(div.style, {
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 9999999,
                display: 'none',
                whiteSpace: 'pre-wrap',
                transitionProperty: 'transform',
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                borderRadius: '4px',
                borderStyle: 'solid',
                pointerEvents: 'none',
                contain: 'content'
              })
              if (appendToBody) {
                document.body.append(div)
              } else {
                container.style.position = 'relative'
                container.appendChild(div)
              }
              break
            }
            case 'show': {
              const div = this._tooltip
              Object.assign(div.style, param)
              if (this._tooltip.parentElement !== document.body) {
                div.style.display = 'block'
              }
              if (param.extraCssText) {
                div.style.cssText += param.extraCssText
              }
              break
            }
            case 'setContent':
              this._tooltip.innerHTML = param
              break
            case 'moveTo':
              const { style } = this._tooltip
              if (this._tooltip.parentElement === document.body) {
                const container = this._canvas.parentElement
                const { left, top } = container.getBoundingClientRect()
                style.display = 'block'
                style.transform = `translate(${left + param[0]}px, ${top + param[1]}px)`
              } else {
                style.transform = `translate(${param[0]}px, ${param[1]}px)`
              }
              break
            case 'hide':
              this._tooltip.style.display = 'none'
              break
            case 'dispose':
              this._tooltip.remove()
              this._tooltip = null
              break
          }
          break
        }
        case 'setCursor': {
          this._canvas.style.cursor = data
        }
      }
    })
  }
  /**
   * 注册主题
   * @param {string} name  light or dark
   * @param {Object} theme options
   * @returns Promise对象
   */
  registerTheme (name, theme) {
    return this.postMessage({
      type: 'registerTheme',
      args: [name, JSON.stringify(theme)]
    })
  }

  /**
   * 重置x轴单位
   * @param {number} point 
   * @returns Promise对象
   */
  resizeAxisUnit (point) {
    return this.postMessage({
      type: 'resizeAxisUnit',
      args: [point]
    })
  }
  /**
   * 绑定事件
   * @param type {String} 监听echart类型
   * @param listener {function} 监听事件回调
   * @param isMust {Boolean} 是否重置
   * @returns {Object} - {type,lisenter}对象
   */
  async on (type, listener, isMust) {
    console.log('this._eventsMap', this._eventsMap[type])
    if (!this._eventsMap[type] > 0 || isMust) {
      this._eventsMap[type] = 0
      await this.postMessage({
        type: 'addEventListener',
        args: [type]
      })
    }
    console.assert(this._eventsMap[type] >= 0, 'Something must be wrong')
    this._eventTarget.addEventListener(type, listener)
    ++this._eventsMap[type]
    return { type, listener }
  }

  /**
   * 解绑事件
   * @param {Object} indicator  -- { type:String,listener:function}
   * @returns null
   */
  async off (indicator) {
    if (!indicator.type) { return }
    const { type, listener } = indicator
    if (this._eventsMap[type] === 1) {
      await this.postMessage({
        type: 'removeEventListener',
        args: [type]
      })
    }
    console.assert(this._eventsMap[type] > 0, 'Something must be wrong')
    this._eventTarget.removeEventListener(type, listener)
    indicator.type = null
    indicator.listener = null
    --this._eventsMap[type]
  }

  /**
   * 初始化
   * @param {dom | canvas} div -dom对象或者canvas对象
   * @param {string} theme -echart 主题
   */
  async init (div, theme) {
    div.innerHTML = ''
    const canvas = this._canvas = document.createElement('canvas')
    canvas.style.cssText = 'width: 100%; height: 100%; margin: 0; user-select: none; border: 0;'
    canvas.width = div.clientWidth
    canvas.height = div.clientHeight
    div.appendChild(canvas)
    const offscreen = canvas.transferControlToOffscreen()
    await this.postMessage({
      type: 'init',
      args: [offscreen, theme, { devicePixelRatio }]
    }, [offscreen])
    // In order not to push too many (mousemove) events in queue,
    // we will prevent new events from responding before
    // previous event is handled.
    let blockEvent = false
    canvas.addEventListener('mousemove', e => {
      if (blockEvent) {
        // console.warn('Blocking mousemove event', e)
        return
      }
      blockEvent = true
      this.postMessage({
        type: 'event',
        args: [e.type, copyByKeys(e, mouseEventKeys)]
      }).then(() => blockEvent = false)
    }, { passive: true })
    mouseEventNames.forEach(eventType => {
      canvas.addEventListener(eventType, e => {
        this.postMessage({
          type: 'event',
          args: [e.type, copyByKeys(e, mouseEventKeys)]
        })
      }, { passive: true })
    })
  }

  /**
   * 调用echart方法
   * @param {string} methodName  -echart方法名 resize、dispatchAction
   * @param  {object} args -配置参数options
   * @returns Promise对象
   */
  callMethod (methodName, ...args) {
    return this.postMessage({
      type: 'callMethod',
      args: [methodName, ...args]
    })
  }

  /**
   * 调用echart的setOption
   * @param {Object} option -echart 配置参数options
   * @param  {Object} args -其他配置 { notMerge?: boolean;replaceMerge?: string | string[];lazyUpdate?: boolean;}
   * @returns Promise对象
   */
  setOption (option, ...args) {
    return this.postMessage({
      type: 'setOption',
      args: [stringify(option, /^[\$_]/), ...args]
    })
  }

  /**
   * 获取当前echart的options
   * @returns Promise对象
   */
  getOption () {
    return this.postMessage({
      type: 'getOption',
      args: []
    })
  }

  /**
   * 获取当前坐标数据开始点起始点
   * @returns Promise对象
   */
  getAxisGrid () {
    return this.postMessage({
      type: 'getAxisGrid',
      args: []
    })
  }

  /**
   * 获取当前横坐标数据
   * @returns Promise对象
   */
  getEchartXInterval () {
    return this.postMessage({
      type: 'getEchartXInterval',
      args: []
    })
  }

  /**
  * 获取当前纵坐标数据
  * @returns Promise对象
  */
  getEchartYInterval () {
    return this.postMessage({
      type: 'getEchartYInterval',
      args: []
    })
  }

  /**
  * 启动或关闭 toolbox 中 dataZoom 的刷选状态。
  * @returns promise对象
  */
  enlargeZoom () {
    return this.postMessage({
      type: 'enlargeZoom',
      args: []
    })
  }

  /**
   * 重置坐标轴
   * @returns promise对象
   */
  restoreZoom () {
    return this.postMessage({
      type: 'restoreZoom',
      args: []
    })
  }
  /**
  * 重置坐标轴 
  * params {Object}-  {type: String,dataZoomIndex: Number, start: Number,end: Number,startValue: Number,endValue: Number}
  * @returns promise对象
  */
  chartDataZoom (params) {
    return this.postMessage({
      type: 'chartDataZoom',
      args: [params]
    })
  }

  /**
   * 调用echart 的dispatchAction
   * @param {Object} payload -配置参数
   * @returns promise对象
   */
  dispatchAction (payload) {
    return this.callMethod('dispatchAction', payload)
  }

  /**
    * 调用echart的resize方法
    * @param opts {Object} -配置参数
    * @returns Promise对象
    */
  resize (opts = {}) {
    return this.callMethod('resize', opts)
  }

  /**
   * 清除echart
   * @returns Promise对象
   */
  clean () {
    return this.postMessage({
      type: 'clean',
      args: []
    })
  }

  /**
   * 清除worker
   */
  dispose () {
    // It's an noop of dispose method in worker
    this._worker.terminate()
    this._tooltip?.remove()
  }
  /**
   * 将消息发送到工作线程;返回的承诺在onmessage消息返回时被解析
   * @param {Object} message - message对象 {type:String,args: Array<any>}
   *  
   * @returns Promise对象
   */
  postMessage (message, transfer) {
    this._promise = this._promise.catch(() => { }).then(() => {
      return new Promise((resolve, reject) => {
        this._worker.addEventListener('message', function onMessage (e) {
          console.assert(Array.isArray(e.data), 'Unknown message type posted: ', e)
          const [type, data] = e.data
          switch (type) {
            case 'resolve': {
              resolve(data)
              this.removeEventListener('message', onMessage)
              break
            }
            case 'reject': {
              reject(data)
              this.removeEventListener('message', onMessage)
              break
            }
            case 'error': {
              const [name, msg, stack] = data
              const error = new self[name](msg)
              error.stack = stack
              reject(error)
              this.removeEventListener('message', onMessage)
              break
            }
          }
        })
        this._worker.postMessage(message, transfer)
      })
    })
    return this._promise
  }
}
export default WorkerECharts