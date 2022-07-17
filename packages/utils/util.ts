import { cloneDeep } from 'lodash-es'
import { DIC_PROPS, DIC_SHOW_SPLIT } from '@qv-vue/constants'
import { validatenull } from './validate'

export function getFixed(val = 0, len = 2) {
  return Number(val.toFixed(len))
}
export function getAsVal(obj: object, bind = '') {
  let result = deepClone(obj)
  if (validatenull(bind)) return result
  bind.split('.').forEach((ele) => {
    result = !validatenull(result[ele]) ? result[ele] : ''
  })
  return result
}
export function setAsVal(obj: object, bind = '', value: any) {
  let result
  let type = getObjType(value)
  if (validatenull(value)) {
    if (type === 'array') {
      result = `obj.${bind}=[]`
    } else if (type === 'object') {
      result = `obj.${bind}={}`
    } else if (['number', 'boolean'].includes(type)) {
      result = `obj.${bind}=undefined`
    } else {
      result = `obj.${bind}=''`
    }
  } else {
    if (type == 'string') {
      result = `obj.${bind}='${value}'`
    } else {
      result = `obj.${bind}=${value}`
    }
  }
  eval(result)
  return obj
}
export const loadScript = (type = 'js', url: string) => {
  let flag = false
  return new Promise((resolve: (value?: unknown) => void) => {
    const head = document.querySelectorAll('head')[0]
    ;(head.children as unknown as any[]).forEach((ele: { src: string }) => {
      if ((ele.src || '').includes(url)) {
        flag = true
        resolve()
      }
    })
    if (flag) return
    let script: HTMLScriptElement
    let link: HTMLLinkElement
    if (type === 'js') {
      script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      head.appendChild(script)
      script.onload = function () {
        resolve()
      }
    } else if (type === 'css') {
      link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = url
      head.appendChild(link)
      link.onload = function () {
        resolve()
      }
    }
  })
}
export function downFile(url: string | object, saveName: string) {
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url) // 创建blob地址
  }
  let aLink = document.createElement('a')
  aLink.href = url as string
  aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  let event
  if (window.MouseEvent) {
    event = new MouseEvent('click')
  } else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    )
  }
  aLink.dispatchEvent(event)
}
export function strCorNum(list: string[]) {
  return list.map((ele) => Number(ele))
}
export function extend(...args: any) {
  let target = args[0] || {}
  let deep = false
  let arr = Array.prototype.slice.call(args)
  let i = 1
  let options, src, key, copy
  let isArray = false
  if (typeof target === 'boolean') {
    deep = target
    i++
    target = args[1]
  }
  for (; i < arr.length; i++) {
    // 循环传入的对象数组
    if ((options = arr[i]) != null) {
      // 如果当前值不是null，如果是null不做处理
      for (key in options) {
        // for in循环对象中key
        copy = options[key]
        src = target[key]
        // 如果对象中value值任然是一个引用类型
        if (
          deep &&
          (toString.call(copy) === '[object Object]' ||
            (isArray = toString.call(copy) == '[object Array]'))
        ) {
          if (isArray) {
            // 如果引用类型是数组
            // 如果目标对象target存在当前key，且数据类型是数组，那就还原此值，如果不是就定义成一个空数组;
            src = toString.call(src) === '[object Array]' ? src : []
          } else {
            // 如果目标对象target存在当前key，且数据类型是对象，那就还原此值，如果不是就定义成一个空对象;
            src = toString.call(src) === '[object Object]' ? src : {}
          }
          // 引用类型就再次调用extend，递归，直到此时copy是一个基本类型的值。
          target[key] = extend(deep, src, copy)
        } else if (copy !== undefined && copy !== src) {
          // 如果这个值是基本值类型，且不是undefined
          target[key] = copy
        }
      }
    }
  }
  return target
}
export function createObj(obj: object, bind: string) {
  const list = bind.split('.')
  const first = list.splice(0, 1)[0]
  const deep: Record<string, any> = {}
  deep[first] = {}
  if (list.length >= 2) {
    const start = '{'
    const end = '}'
    let result = ''
    list.forEach((ele) => {
      result = `${result}${start}"${ele}":`
    })
    result = `${result}""`
    for (let i = 0; i < list.length; i++) {
      result = `${result}${end}`
    }
    result = JSON.parse(result)
    deep[first] = result
  }
  obj = extend(true, obj, deep)
  return obj
}
export function dataURLtoFile(dataurl: string, filename: string) {
  const arr: string[] = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {
    type: mime,
  })
}

export function findObject(list: any, value: any, key = 'prop'): any {
  let result: any
  let type = (() => {
    let result
    list.forEach((ele: any) => {
      if (ele.column) {
        result = 'group'
      } else if (ele.children) {
        result = 'tree'
      }
    })
    return result
  })()
  if (type === 'group') {
    list.forEach((ele: any) => {
      const val = findArray(ele.column, value, key, true)
      if (val !== -1) result = val
    })
  } else if (type === 'tree') {
    result = findLabelNode(list, value, { value: key }, true)
  } else {
    result = findArray(list, value, key, true)
  }
  return result
}
/**
 * 生成随机数
 */
export function randomId() {
  const $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const maxPos = $chars.length
  let id = ''
  for (let i = 0; i < 16; i++) {
    id += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return id
}
export const getObjType = (obj: unknown) => {
  const toString = Object.prototype.toString
  const map: Record<string, string> = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  if (obj instanceof Element) {
    return 'element'
  }
  const key: string = toString.call(obj)
  return map[key]
}
/**
 *判断是否为json对象
 */

export const isJson = (str: any[] | object) => {
  if (Array.isArray(str)) {
    if (str[0] instanceof Object) {
      return true
    } else {
      return false
    }
  } else if (str instanceof Object) {
    return true
  }
  return false
}
/**
 * 对象深拷贝
 */
// const refHistory = useManualRefHistory(target, { clone: structuredClone });
export const deepClone = (data: any) => {
  return cloneDeep(data)
}
/**
 * 根据字段数组排序
 */
export const sortArrys = (list: any[], prop: string) => {
  list.sort((a, b) => {
    if (a[prop] > b[prop]) {
      return -1
    }
    if (a[prop] < b[prop]) {
      return 1
    }
    return 0
  })
  return list
}

/**
 * 设置px像素
 */
export const setPx = (
  val: number | string,
  defval?: number | string
): string => {
  if (validatenull(val)) val = defval || ''
  if (validatenull(val)) return ''
  let n = val?.toString()
  if (!n?.includes('%')) {
    n = `${n}px`
  }
  return n
}

/**
 * 字符串数据类型转化
 */
export const detailDataType = (value: string, type: string) => {
  if (validatenull(value)) return value
  if (type === 'number') {
    return Number(value)
  } else if (type === 'string') {
    return value
  } else {
    return value
  }
}
// 获取url中的参数
export const getUrlParams = (url: string) => {
  const result = {
    url: '',
    params: {} as Record<string, any>,
  }
  const list = url.split('?')
  result.url = list[0]
  const params = list[1]
  if (params) {
    const list = params.split('&')
    list.forEach((ele: any) => {
      const dic = ele.split('=')
      const label = dic[0]
      const value = dic[1]
      result.params[label] = value
    })
  }
  return result
}

/**
 * 数组的数据类型转化
 */
export const detailDic = (list: any[] = [], props: any = {}, type: string) => {
  let valueKey = props.value || DIC_PROPS.value
  let childrenKey = props.children || DIC_PROPS.children
  list.forEach((ele) => {
    ele[valueKey] = detailDataType(ele[valueKey], type)
    if (ele[childrenKey]) detailDic(ele[childrenKey], props, type)
  })
  return list
}
/**
 * 根据字典的value显示label
 */

export const findByValue = (dic: any, value: any, props: any) => {
  // 如果为空直接返回
  if (validatenull(dic)) return value
  const result: any[] = []
  const isArray = Array.isArray(value)
  const list = isArray ? value : [value]
  props = props || DIC_PROPS
  for (const item of list) {
    result.push(findLabelNode(dic, item, props) || item)
  }
  if (isArray) {
    return result.join(DIC_SHOW_SPLIT).toString()
  }
  return result.join()
}
/**
 * 过滤字典翻译字段和空字段
 */
export const filterParams = (form: any, list = ['', '$'], deep = true) => {
  let data = deep ? deepClone(form) : form
  for (let o in data) {
    if (list.includes('')) {
      if (validatenull(data[o])) delete data[o]
    }
    // if (list.includes('$')) {
    // 	if (o.indexOf('$') !== -1) delete data[o];
    // }
  }
  return data
}
/**
 * 处理存在group分组的情况
 */
export const detailDicGroup = (dic: any[], props: any) => {
  let list = deepClone(dic)
  let groupsKey = props[DIC_PROPS.groups] || DIC_PROPS.groups
  dic.forEach((ele) => {
    if (ele[groupsKey]) {
      list = list.concat(ele[groupsKey])
    }
  })
  return list
}
/**
 * 根据label去找到节点
 */
export const findLabelNode = (
  dic: any,
  value: any,
  props: any,
  obj: any = null
): any => {
  let result
  if (!obj) dic = detailDicGroup(dic, props)
  const rev = (dic1: any) => {
    const labelKey = props.label || DIC_PROPS.label
    const valueKey = props.value || DIC_PROPS.value
    const childrenKey = props.children || DIC_PROPS.children
    for (const item of dic1) {
      const ele = item
      const children = ele[childrenKey] || []
      if (ele[valueKey] === value) {
        result = obj ? ele : ele[labelKey]
      } else {
        rev(children)
      }
    }
  }
  rev(dic)
  return result
}
/**
 * 获取多层data
 */
export const getDeepData = (res: any) => {
  return (Array.isArray(res) ? res : res.data) || []
}
export const getObjValue = (data: any, params = '', type?: any) => {
  const list = params.split('.')
  let result = data
  if (list[0] === '' && type !== 'object') {
    return getDeepData(data)
  } else if (list[0] !== '') {
    list.forEach((ele) => {
      result = result[ele]
    })
  }
  return result
}
/**
 * 根据值查找对应的序号
 */
export const findArray = (dic: any, value: any, valueKey: any, obj: any) => {
  valueKey = valueKey || DIC_PROPS.value
  for (const [index, item] of dic.entries()) {
    if (item[valueKey] === value) {
      return obj ? item : index
    }
  }
  return -1
}
/**
 * 根据位数获取*密码程度
 */
export const getPasswordChar = (result: number | string = '', char: any) => {
  const len = result.toString().length
  result = ''
  for (let i = 0; i < len; i++) {
    result = result + char
  }
  return result
}

export const arraySort = (list: any[] = [], prop: any, callback: any) => {
  return list
    .filter((ele) => !validatenull(ele[prop]))
    .sort((a, b) => callback(a, b))
    .concat(list.filter((ele) => validatenull(ele[prop])))
}
export const clearVal = (obj: any, list: any[] = []) => {
  if (!obj) return {}
  Object.keys(obj).forEach((ele: string) => {
    if (list.includes(ele as never)) return
    else if (ele.includes('$')) delete obj[ele]
    else if (!validatenull(obj[ele])) {
      let type = getObjType(obj[ele])
      if (type === 'array') obj[ele] = []
      else if (type === 'object') obj[ele] = {}
      else if (['number', 'boolean'].includes(type)) obj[ele] = undefined
      else obj[ele] = ''
    }
  })
  return obj
}
/**
 * 验证是否存在true/false
 */
export const validData = (val: any, dafult?: any) => {
  if (typeof val === 'boolean') {
    return val
  }
  return !validatenull(val) ? val : dafult
}
