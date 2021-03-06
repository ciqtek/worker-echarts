
# worker-echarts


## đ ä˝żç¨ćç¨

### ĺŽčŁ

```bash
  npm i install worker-echarts --save-dev or yarn add worker-echarts --save-dev
```

### ä˝żç¨

You can use [Echarts(4.3.2)](https://echarts.apache.org/) API

```js
import WorkerEcharts from "worker-echarts"

let workerEchart = new WorkerEcharts()

workerEchart.init(dom)
workerEchart.setOptions(options)

```

### đ ććĄŁ

<a name="WorkerECharts"></a>

## WorkerECharts

  - [WorkerECharts](#workerecharts)
    - [new WorkerECharts()](#new-workerecharts)
    - [workerECharts.registerTheme(name, theme) â](#workerechartsregisterthemename-theme-)
    - [workerECharts.resizeAxisUnit(point) â](#workerechartsresizeaxisunitpoint-)
    - [workerECharts.on(type, listener, isMust) â <code>Object</code>](#workerechartsontype-listener-ismust--object)
    - [workerECharts.off(indicator) â](#workerechartsoffindicator-)
    - [workerECharts.init(div, theme)](#workerechartsinitdiv-theme)
    - [workerECharts.callMethod(methodName, ...args) â](#workerechartscallmethodmethodname-args-)
    - [workerECharts.setOption(option, ...args) â](#workerechartssetoptionoption-args-)
    - [workerECharts.getOption() â](#workerechartsgetoption-)
    - [workerECharts.getAxisGrid() â](#workerechartsgetaxisgrid-)
    - [workerECharts.getEchartXInterval() â](#workerechartsgetechartxinterval-)
    - [workerECharts.getEchartYInterval() â](#workerechartsgetechartyinterval-)
    - [workerECharts.enlargeZoom() â](#workerechartsenlargezoom-)
    - [workerECharts.restoreZoom() â](#workerechartsrestorezoom-)
    - [workerECharts.chartDataZoom() â](#workerechartschartdatazoom-)
    - [workerECharts.dispatchAction(payload) â](#workerechartsdispatchactionpayload-)
    - [workerECharts.resize(opts) â](#workerechartsresizeopts-)
    - [workerECharts.clean() â](#workerechartsclean-)
    - [workerECharts.dispose()](#workerechartsdispose)
    - [workerECharts.postMessage(message) â](#workerechartspostmessagemessage-)

<a name="new_WorkerECharts_new"></a>

### new WorkerECharts()
WorkerEcharts Class

<a name="WorkerECharts+registerTheme"></a>

### workerECharts.registerTheme(name, theme) â
ćł¨ĺä¸ťé˘

**Returns**: PromiseĺŻščąĄ  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | light or dark |
| theme | <code>Object</code> | options |

<a name="WorkerECharts+resizeAxisUnit"></a>

### workerECharts.resizeAxisUnit(point) â
éç˝Žxč˝´ĺä˝

**Returns**: PromiseĺŻščąĄ  

| Param | Type |
| --- | --- |
| point | <code>number</code> | 

<a name="WorkerECharts+on"></a>

### workerECharts.on(type, listener, isMust) â <code>Object</code>
çťĺŽäşäťś

**Returns**: <code>Object</code> - - {type,lisenter}ĺŻščąĄ  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | çĺŹechartçąťĺ |
| listener | <code>function</code> | çĺŹäşäťśĺč° |
| isMust | <code>Boolean</code> | ćŻĺŚéç˝Ž |

<a name="WorkerECharts+off"></a>

### workerECharts.off(indicator) â
č§Łçťäşäťś

**Returns**: null  

| Param | Type | Description |
| --- | --- | --- |
| indicator | <code>Object</code> | - { type:String,listener:function} |

<a name="WorkerECharts+init"></a>

### workerECharts.init(div, theme)
ĺĺ§ĺ


| Param | Type | Description |
| --- | --- | --- |
| div | <code>dom</code> \| <code>canvas</code> | domĺŻščąĄćčcanvasĺŻščąĄ |
| theme | <code>string</code> | echart ä¸ťé˘ |

<a name="WorkerECharts+callMethod"></a>

### workerECharts.callMethod(methodName, ...args) â
č°ç¨echartćšćł

**Returns**: PromiseĺŻščąĄ  

| Param | Type | Description |
| --- | --- | --- |
| methodName | <code>string</code> | echartćšćłĺ resizeădispatchAction |
| ...args | <code>object</code> | éç˝Žĺć°options |

<a name="WorkerECharts+setOption"></a>

### workerECharts.setOption(option, ...args) â
č°ç¨echartçsetOption

**Returns**: PromiseĺŻščąĄ  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>Object</code> | echart éç˝Žĺć°options |
| ...args | <code>Object</code> | ĺśäťéç˝Ž { notMerge?: boolean;replaceMerge?: string | string[];lazyUpdate?: boolean;} |

<a name="WorkerECharts+getOption"></a>

### workerECharts.getOption() â
čˇĺĺ˝ĺechartçoptions

**Returns**: PromiseĺŻščąĄ  
<a name="WorkerECharts+getAxisGrid"></a>

### workerECharts.getAxisGrid() â
čˇĺĺ˝ĺĺć ć°ćŽĺźĺ§çščľˇĺ§çš

**Returns**: PromiseĺŻščąĄ  

<a name="WorkerECharts+getEchartXInterval"></a>

### workerECharts.getEchartXInterval() â
čˇĺĺ˝ĺć¨Şĺć ć°ćŽ

**Returns**: PromiseĺŻščąĄ  
<a name="WorkerECharts+getEchartYInterval"></a>

### workerECharts.getEchartYInterval() â
čˇĺĺ˝ĺçşľĺć ć°ćŽ

**Returns**: PromiseĺŻščąĄ  
<a name="WorkerECharts+enlargeZoom"></a>

### workerECharts.enlargeZoom() â
ĺŻĺ¨ćĺłé­ toolbox ä¸­ dataZoom çĺˇéçśćă

**Returns**: promiseĺŻščąĄ  
<a name="WorkerECharts+restoreZoom"></a>

### workerECharts.restoreZoom() â
éç˝Žĺć č˝´

**Returns**: promiseĺŻščąĄ  
<a name="WorkerECharts+chartDataZoom"></a>

### workerECharts.chartDataZoom() â
éç˝Žĺć č˝´ 
params {Object}-  {type: String,dataZoomIndex: Number, start: Number,end: Number,startValue: Number,endValue: Number}

**Returns**: promiseĺŻščąĄ  
<a name="WorkerECharts+dispatchAction"></a>

### workerECharts.dispatchAction(payload) â
č°ç¨echart çdispatchAction

**Returns**: promiseĺŻščąĄ  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | éç˝Žĺć° |

<a name="WorkerECharts+resize"></a>

### workerECharts.resize(opts) â
č°ç¨echartçresizećšćł

**Returns**: PromiseĺŻščąĄ  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | éç˝Žĺć° |

<a name="WorkerECharts+clean"></a>

### workerECharts.clean() â
ć¸é¤echart

**Returns**: PromiseĺŻščąĄ  
<a name="WorkerECharts+dispose"></a>

### workerECharts.dispose()
ć¸é¤worker

<a name="WorkerECharts+postMessage"></a>

### workerECharts.postMessage(message) â
ĺ°ćśćŻĺéĺ°ĺˇĽä˝çşżç¨;čżĺçćżčŻşĺ¨onmessagećśćŻčżĺćśč˘Ťč§Łć

**Returns**: PromiseĺŻščąĄ  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Object</code> | messageĺŻščąĄ {type:String,args: Array<any>} |

