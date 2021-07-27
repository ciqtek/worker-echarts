
# worker-echarts


## 🚄 使用教程

### 安装

```bash
  npm i install worker-echarts --save-dev or yarn add worker-echarts --save-dev
```

### 使用

You can use [Echarts(4.3.2)](https://echarts.apache.org/) API

```js
import WorkerEcharts from "worker-echarts"

let workerEchart = new WorkerEcharts()

workerEchart.init(dom)
workerEchart.setOptions(options)

```

### 📖 文档

<a name="WorkerECharts"></a>

## WorkerECharts

  - [WorkerECharts](#workerecharts)
    - [new WorkerECharts()](#new-workerecharts)
    - [workerECharts.registerTheme(name, theme) ⇒](#workerechartsregisterthemename-theme-)
    - [workerECharts.resizeAxisUnit(point) ⇒](#workerechartsresizeaxisunitpoint-)
    - [workerECharts.on(type, listener, isMust) ⇒ <code>Object</code>](#workerechartsontype-listener-ismust--object)
    - [workerECharts.off(indicator) ⇒](#workerechartsoffindicator-)
    - [workerECharts.init(div, theme)](#workerechartsinitdiv-theme)
    - [workerECharts.callMethod(methodName, ...args) ⇒](#workerechartscallmethodmethodname-args-)
    - [workerECharts.setOption(option, ...args) ⇒](#workerechartssetoptionoption-args-)
    - [workerECharts.getOption() ⇒](#workerechartsgetoption-)
    - [workerECharts.getAxisGrid() ⇒](#workerechartsgetaxisgrid-)
    - [workerECharts.getEchartXInterval() ⇒](#workerechartsgetechartxinterval-)
    - [workerECharts.getEchartYInterval() ⇒](#workerechartsgetechartyinterval-)
    - [workerECharts.enlargeZoom() ⇒](#workerechartsenlargezoom-)
    - [workerECharts.restoreZoom() ⇒](#workerechartsrestorezoom-)
    - [workerECharts.chartDataZoom() ⇒](#workerechartschartdatazoom-)
    - [workerECharts.dispatchAction(payload) ⇒](#workerechartsdispatchactionpayload-)
    - [workerECharts.resize(opts) ⇒](#workerechartsresizeopts-)
    - [workerECharts.clean() ⇒](#workerechartsclean-)
    - [workerECharts.dispose()](#workerechartsdispose)
    - [workerECharts.postMessage(message) ⇒](#workerechartspostmessagemessage-)

<a name="new_WorkerECharts_new"></a>

### new WorkerECharts()
WorkerEcharts Class

<a name="WorkerECharts+registerTheme"></a>

### workerECharts.registerTheme(name, theme) ⇒
注册主题

**Returns**: Promise对象  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | light or dark |
| theme | <code>Object</code> | options |

<a name="WorkerECharts+resizeAxisUnit"></a>

### workerECharts.resizeAxisUnit(point) ⇒
重置x轴单位

**Returns**: Promise对象  

| Param | Type |
| --- | --- |
| point | <code>number</code> | 

<a name="WorkerECharts+on"></a>

### workerECharts.on(type, listener, isMust) ⇒ <code>Object</code>
绑定事件

**Returns**: <code>Object</code> - - {type,lisenter}对象  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | 监听echart类型 |
| listener | <code>function</code> | 监听事件回调 |
| isMust | <code>Boolean</code> | 是否重置 |

<a name="WorkerECharts+off"></a>

### workerECharts.off(indicator) ⇒
解绑事件

**Returns**: null  

| Param | Type | Description |
| --- | --- | --- |
| indicator | <code>Object</code> | - { type:String,listener:function} |

<a name="WorkerECharts+init"></a>

### workerECharts.init(div, theme)
初始化


| Param | Type | Description |
| --- | --- | --- |
| div | <code>dom</code> \| <code>canvas</code> | dom对象或者canvas对象 |
| theme | <code>string</code> | echart 主题 |

<a name="WorkerECharts+callMethod"></a>

### workerECharts.callMethod(methodName, ...args) ⇒
调用echart方法

**Returns**: Promise对象  

| Param | Type | Description |
| --- | --- | --- |
| methodName | <code>string</code> | echart方法名 resize、dispatchAction |
| ...args | <code>object</code> | 配置参数options |

<a name="WorkerECharts+setOption"></a>

### workerECharts.setOption(option, ...args) ⇒
调用echart的setOption

**Returns**: Promise对象  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>Object</code> | echart 配置参数options |
| ...args | <code>Object</code> | 其他配置 { notMerge?: boolean;replaceMerge?: string | string[];lazyUpdate?: boolean;} |

<a name="WorkerECharts+getOption"></a>

### workerECharts.getOption() ⇒
获取当前echart的options

**Returns**: Promise对象  
<a name="WorkerECharts+getAxisGrid"></a>

### workerECharts.getAxisGrid() ⇒
获取当前坐标数据开始点起始点

**Returns**: Promise对象  

<a name="WorkerECharts+getEchartXInterval"></a>

### workerECharts.getEchartXInterval() ⇒
获取当前横坐标数据

**Returns**: Promise对象  
<a name="WorkerECharts+getEchartYInterval"></a>

### workerECharts.getEchartYInterval() ⇒
获取当前纵坐标数据

**Returns**: Promise对象  
<a name="WorkerECharts+enlargeZoom"></a>

### workerECharts.enlargeZoom() ⇒
启动或关闭 toolbox 中 dataZoom 的刷选状态。

**Returns**: promise对象  
<a name="WorkerECharts+restoreZoom"></a>

### workerECharts.restoreZoom() ⇒
重置坐标轴

**Returns**: promise对象  
<a name="WorkerECharts+chartDataZoom"></a>

### workerECharts.chartDataZoom() ⇒
重置坐标轴 
params {Object}-  {type: String,dataZoomIndex: Number, start: Number,end: Number,startValue: Number,endValue: Number}

**Returns**: promise对象  
<a name="WorkerECharts+dispatchAction"></a>

### workerECharts.dispatchAction(payload) ⇒
调用echart 的dispatchAction

**Returns**: promise对象  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | 配置参数 |

<a name="WorkerECharts+resize"></a>

### workerECharts.resize(opts) ⇒
调用echart的resize方法

**Returns**: Promise对象  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置参数 |

<a name="WorkerECharts+clean"></a>

### workerECharts.clean() ⇒
清除echart

**Returns**: Promise对象  
<a name="WorkerECharts+dispose"></a>

### workerECharts.dispose()
清除worker

<a name="WorkerECharts+postMessage"></a>

### workerECharts.postMessage(message) ⇒
将消息发送到工作线程;返回的承诺在onmessage消息返回时被解析

**Returns**: Promise对象  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Object</code> | message对象 {type:String,args: Array<any>} |

